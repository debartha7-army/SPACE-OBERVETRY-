import express from 'express';
import { getPapers, getSocial, getStatus, triggerManualSync } from '../controllers/dispatchController.js';

const router = express.Router();

// GET /api/v1/dispatches/papers
router.get('/papers', getPapers);

// GET /api/v1/dispatches/social
router.get('/social', getSocial);

// GET /api/v1/dispatches/status
router.get('/status', getStatus);

// POST /api/v1/dispatches/sync
router.post('/sync', triggerManualSync);

export default router;
