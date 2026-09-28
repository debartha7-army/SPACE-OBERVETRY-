import express from 'express';
import { EventController } from '../controllers/eventController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';
import { eventValidationRules } from '../middleware/validation.js';

const router = express.Router();

router.get('/', EventController.getAll);
router.get('/reminders', authenticate, EventController.getReminders);
router.post('/reminders/toggle', authenticate, EventController.toggleReminder);
router.get('/:id', EventController.getById);
router.post('/', authenticate, requireAdmin, eventValidationRules, EventController.create);
router.put('/:id', authenticate, requireAdmin, EventController.update);
router.delete('/:id', authenticate, requireAdmin, EventController.delete);

export default router;
