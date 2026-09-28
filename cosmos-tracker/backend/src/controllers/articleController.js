import { ArticleModel } from '../models/articleModel.js';

export const ArticleController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { category, search } = req.query;

      const { data, error } = await ArticleModel.findAll({ page: 1, limit: 1000 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      let articles = data || [];

      if (category && category !== 'all') {
        articles = articles.filter(a => a.category?.toLowerCase().includes(category.toLowerCase()));
      }

      if (search) {
        const q = search.toLowerCase();
        articles = articles.filter(a =>
          a.title?.toLowerCase().includes(q) ||
          a.summary?.toLowerCase().includes(q) ||
          a.category?.toLowerCase().includes(q)
        );
      }

      const total = articles.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = articles.slice((page - 1) * limit, page * limit);

      return res.status(200).json({
        success: true,
        data: paginated,
        pagination: { total, page, limit, totalPages }
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await ArticleModel.findById(id);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const payload = {
        ...req.body,
        author_id: req.user ? req.user.id : null,
        published_at: req.body.published_at || new Date().toISOString().split('T')[0]
      };

      const { data, error } = await ArticleModel.create(payload);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Article published.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await ArticleModel.update(id, req.body);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Article not found or update failed.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Article updated.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await ArticleModel.delete(id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Article deleted.'
      });
    } catch (err) {
      next(err);
    }
  }
};
