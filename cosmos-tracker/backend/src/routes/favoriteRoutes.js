import express from 'express';
import { FavoriteController } from '../controllers/favoriteController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, FavoriteController.getUserFavorites);
router.post('/toggle', authenticate, FavoriteController.toggleFavorite);
router.delete('/:id', authenticate, FavoriteController.delete);

export default router;
