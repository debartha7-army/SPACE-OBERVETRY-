import { body, validationResult } from 'express-validator';

/**
 * Handle express-validator errors consistently
 */
export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: ' + errors.array().map(e => e.msg).join(', '),
      errors: errors.array()
    });
  }
  next();
};

/**
 * Register validation rules
 */
export const registerValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  validateResult
];

/**
 * Login validation rules
 */
export const loginValidationRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateResult
];

/**
 * Celestial event validation rules
 */
export const eventValidationRules = [
  body('title').trim().notEmpty().withMessage('Event title is required'),
  body('type').trim().notEmpty().withMessage('Event type is required'),
  body('event_date').trim().notEmpty().withMessage('Event date is required'),
  validateResult
];

/**
 * Star validation rules
 */
export const starValidationRules = [
  body('name').trim().notEmpty().withMessage('Star name is required'),
  body('constellation').trim().notEmpty().withMessage('Constellation is required'),
  body('type').trim().notEmpty().withMessage('Spectral/Stellar type is required'),
  validateResult
];

/**
 * Planet validation rules
 */
export const planetValidationRules = [
  body('name').trim().notEmpty().withMessage('Planet name is required'),
  body('type').trim().notEmpty().withMessage('Planetary type is required'),
  validateResult
];

/**
 * Nova / Variable star validation rules
 */
export const novaValidationRules = [
  body('name').trim().notEmpty().withMessage('Nova name is required'),
  body('kind').trim().notEmpty().withMessage('Variable kind is required'),
  validateResult
];

/**
 * Theory validation rules
 */
export const theoryValidationRules = [
  body('title').trim().notEmpty().withMessage('Theory title is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('summary').trim().notEmpty().withMessage('Summary is required'),
  validateResult
];

/**
 * Article validation rules
 */
export const articleValidationRules = [
  body('title').trim().notEmpty().withMessage('Article title is required'),
  body('summary').trim().notEmpty().withMessage('Summary is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  validateResult
];
