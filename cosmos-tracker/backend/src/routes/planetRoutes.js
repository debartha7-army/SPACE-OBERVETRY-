import express from 'express';
import { PlanetController } from '../controllers/planetController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';
import { planetValidationRules } from '../middleware/validation.js';

const router = express.Router();

router.get('/', PlanetController.getAll);
router.get('/moons/all', PlanetController.getAllMoons);
router.get('/:id', PlanetController.getById);
router.post('/', authenticate, requireAdmin, planetValidationRules, PlanetController.create);
router.put('/:id', authenticate, requireAdmin, PlanetController.update);
router.delete('/:id', authenticate, requireAdmin, PlanetController.delete);

export default router;
