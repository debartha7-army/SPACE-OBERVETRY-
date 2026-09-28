import express from 'express';
import { ArticleController } from '../controllers/articleController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/role.js';
import { articleValidationRules } from '../middleware/validation.js';

const router = express.Router();

router.get('/', ArticleController.getAll);
router.get('/:id', ArticleController.getById);
router.post('/', authenticate, requireAdmin, articleValidationRules, ArticleController.create);
router.put('/:id', authenticate, requireAdmin, ArticleController.update);
router.delete('/:id', authenticate, requireAdmin, ArticleController.delete);

export default router;
