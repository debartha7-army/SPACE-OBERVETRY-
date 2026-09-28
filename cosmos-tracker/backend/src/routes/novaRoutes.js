import express from 'express';
import { NovaController } from '../controllers/novaController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';
import { novaValidationRules } from '../middleware/validation.js';

const router = express.Router();

router.get('/', NovaController.getAll);
router.get('/:id', NovaController.getById);
router.post('/', authenticate, requireAdmin, novaValidationRules, NovaController.create);
router.put('/:id', authenticate, requireAdmin, NovaController.update);
router.delete('/:id', authenticate, requireAdmin, NovaController.delete);

export default router;
