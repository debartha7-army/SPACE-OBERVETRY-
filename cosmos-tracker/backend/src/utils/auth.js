import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10; // Salt rounds 10-12 as specified
const JWT_SECRET = process.env.JWT_SECRET || 'cosmos_tracker_super_cosmic_jwt_secret_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Hash plain password using bcrypt (salt rounds 10-12)
 * @param {string} password
 * @returns {Promise<string>}
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare plain password with stored bcrypt hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generate signed JWT token
 * @param {object} payload
 * @returns {string}
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify JWT token
 * @param {string} token
 * @returns {object}
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
