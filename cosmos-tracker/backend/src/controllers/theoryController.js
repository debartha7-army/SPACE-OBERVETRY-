import { TheoryModel } from '../models/theoryModel.js';

export const TheoryController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { category, search } = req.query;

      const { data, error } = await TheoryModel.findAll({ page: 1, limit: 1000 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      let theories = data || [];

      if (category && category !== 'all') {
        theories = theories.filter(t => t.category?.toLowerCase().includes(category.toLowerCase()));
      }

      if (search) {
        const q = search.toLowerCase();
        theories = theories.filter(t =>
          t.title?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q) ||
          t.summary?.toLowerCase().includes(q) ||
          t.details?.toLowerCase().includes(q)
        );
      }

      const total = theories.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = theories.slice((page - 1) * limit, page * limit);

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
      const { data, error } = await TheoryModel.findById(id);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Theory not found.' });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { data, error } = await TheoryModel.create(req.body);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Cosmological theory archived.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await TheoryModel.update(id, req.body);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Theory not found or update failed.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Theory updated.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await TheoryModel.delete(id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Theory deleted.'
      });
    } catch (err) {
      next(err);
    }
  }
};
