import express from 'express';
import { StarController } from '../controllers/starController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';
import { starValidationRules } from '../middleware/validation.js';

const router = express.Router();

router.get('/', StarController.getAll);
router.get('/:id', StarController.getById);
router.post('/', authenticate, requireAdmin, starValidationRules, StarController.create);
router.put('/:id', authenticate, requireAdmin, StarController.update);
router.delete('/:id', authenticate, requireAdmin, StarController.delete);

export default router;
