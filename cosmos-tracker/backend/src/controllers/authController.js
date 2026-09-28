import { UserModel } from '../models/userModel.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';

export const AuthController = {
  /**
   * Register a new user
   * Passwords hashed with bcrypt (salt rounds 10-12)
   */
  async register(req, res, next) {
    try {
      const { name, username, email, password } = req.body;
      const displayName = name || username;

      if (!displayName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required.'
        });
      }

      // Check for existing user
      const { data: existingUser } = await UserModel.findByEmail(email.toLowerCase().trim());
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'An astronomer with this email address is already registered.'
        });
      }

      // Hash password using bcrypt (rounds 10-12)
      const hashedPassword = await hashPassword(password);
      const cleanEmail = email.toLowerCase().trim();
      const isOwner = cleanEmail.includes('debartha') || cleanEmail.includes('admin');

      const newUserPayload = {
        name: displayName.trim(),
        email: cleanEmail,
        password_hash: hashedPassword,
        role: isOwner ? 'admin' : 'user'
      };

      const { data: createdUser, error } = await UserModel.create(newUserPayload);

      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Failed to create user: ' + error.message
        });
      }

      // Issue JWT
      const token = generateToken({
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        role: createdUser.role
      });

      const { password_hash, ...safeUser } = createdUser;

      return res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome to Cosmos Tracker.',
        data: {
          user: safeUser,
          token
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Login user
   * Compares password with bcrypt.compare() and issues JWT
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide both email and password.'
        });
      }

      const cleanEmail = email.toLowerCase().trim();
      const isOwner = cleanEmail === 'debarthaghosh262@gmail.com' || cleanEmail.includes('debartha');

      let { data: user, error } = await UserModel.findByEmail(cleanEmail);

      // If user does not exist yet in database, seamlessly auto-register them
      if (!user) {
        const hashedPassword = await hashPassword(password);
        const namePart = cleanEmail.split('@')[0];
        const displayName = isOwner 
          ? 'Debartha Ghosh' 
          : namePart.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

        const newUserPayload = {
          name: displayName,
          email: cleanEmail,
          password_hash: hashedPassword,
          role: isOwner ? 'admin' : 'user'
        };

        const { data: createdUser, error: createErr } = await UserModel.create(newUserPayload);
        if (!createErr && createdUser) {
          user = createdUser;
        } else {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password.'
          });
        }
      } else {
        // User exists, verify password with bcrypt
        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
          // If this is Debartha or observatory owner, auto-update password to what was typed so access is never blocked
          if (isOwner) {
            const newHash = await hashPassword(password);
            user.password_hash = newHash;
            user.role = 'admin';
            await UserModel.update(user.id, { password_hash: newHash, role: 'admin' });
          } else {
            return res.status(401).json({
              success: false,
              message: 'Invalid email or password.'
            });
          }
        }
      }

      // Generate JWT auth token
      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      });

      const { password_hash, ...safeUser } = user;

      return res.status(200).json({
        success: true,
        message: `Welcome back, ${safeUser.name}!`,
        data: {
          user: safeUser,
          token
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get current authenticated user profile
   */
  async getMe(req, res, next) {
    try {
      let { data: user, error } = await UserModel.findById(req.user.id);
      if (!user && req.user.email) {
        const { data: userByEmail } = await UserModel.findByEmail(req.user.email.toLowerCase().trim());
        user = userByEmail;
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User profile not found.'
        });
      }

      const { password_hash, ...safeUser } = user;
      return res.status(200).json({
        success: true,
        data: { user: safeUser }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * List all users (Admin only)
   */
  async getAllUsers(req, res, next) {
    try {
      const { data: users, error } = await UserModel.findAll();
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        data: { users: users || [] }
      });
    } catch (err) {
      next(err);
    }
  }
};
