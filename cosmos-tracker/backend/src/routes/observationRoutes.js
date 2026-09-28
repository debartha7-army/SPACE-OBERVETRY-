import express from 'express';
import { ObservationController } from '../controllers/observationController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, ObservationController.getUserObservations);
router.post('/', authenticate, ObservationController.create);
router.delete('/:id', authenticate, ObservationController.delete);

export default router;
