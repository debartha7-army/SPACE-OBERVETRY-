import express from 'express';
import { NasaController } from '../controllers/nasaController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';

const router = express.Router();

router.get('/apod', NasaController.getApod);
router.get('/sky-of-the-month', NasaController.getSkyOfTheMonth);
router.post('/auto-import', authenticate, requireAdmin, NasaController.autoImportNews);

export default router;
