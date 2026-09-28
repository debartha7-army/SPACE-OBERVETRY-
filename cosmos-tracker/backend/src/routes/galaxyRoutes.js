import express from 'express';
import { GalaxyController } from '../controllers/galaxyController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';

const router = express.Router();

router.get('/', GalaxyController.getAll);
router.get('/:id', GalaxyController.getById);
router.post('/', authenticate, requireAdmin, GalaxyController.create);
router.put('/:id', authenticate, requireAdmin, GalaxyController.update);
router.delete('/:id', authenticate, requireAdmin, GalaxyController.delete);

export default router;
