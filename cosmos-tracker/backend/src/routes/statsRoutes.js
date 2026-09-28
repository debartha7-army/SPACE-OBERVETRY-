import express from 'express';
import { StatsController } from '../controllers/statsController.js';

const router = express.Router();

router.get('/overview', StatsController.getOverview);

export default router;
