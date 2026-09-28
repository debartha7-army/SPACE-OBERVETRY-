import express from 'express';
import { TheoryController } from '../controllers/theoryController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';
import { theoryValidationRules } from '../middleware/validation.js';

const router = express.Router();

router.get('/', TheoryController.getAll);
router.get('/:id', TheoryController.getById);
router.post('/', authenticate, requireAdmin, theoryValidationRules, TheoryController.create);
router.put('/:id', authenticate, requireAdmin, TheoryController.update);
router.delete('/:id', authenticate, requireAdmin, TheoryController.delete);

export default router;
