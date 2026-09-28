import express from 'express';
import { BlackHoleController } from '../controllers/blackHoleController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';

const router = express.Router();

router.get('/', BlackHoleController.getAll);
router.get('/:id', BlackHoleController.getById);
router.post('/', authenticate, requireAdmin, BlackHoleController.create);
router.put('/:id', authenticate, requireAdmin, BlackHoleController.update);
router.delete('/:id', authenticate, requireAdmin, BlackHoleController.delete);

export default router;
