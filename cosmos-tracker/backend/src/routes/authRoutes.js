import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';
import { loginRateLimiter } from '../middleware/rateLimit.js';
import { registerValidationRules, loginValidationRules } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', registerValidationRules, AuthController.register);
router.post('/login', loginRateLimiter, loginValidationRules, AuthController.login);
router.get('/me', authenticate, AuthController.getMe);
router.get('/users', authenticate, requireAdmin, AuthController.getAllUsers);

export default router;
