import { StarModel } from '../models/starModel.js';

export const StarController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { constellation, type, search } = req.query;

      const { data, error } = await StarModel.findAll({ page: 1, limit: 1000 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      let stars = data || [];

      if (constellation && constellation !== 'all') {
        stars = stars.filter(s => s.constellation?.toLowerCase().includes(constellation.toLowerCase()));
      }

      if (type && type !== 'all') {
        stars = stars.filter(s => s.type?.toLowerCase().includes(type.toLowerCase()));
      }

      if (search) {
        const q = search.toLowerCase();
        stars = stars.filter(s =>
          s.name?.toLowerCase().includes(q) ||
          s.constellation?.toLowerCase().includes(q) ||
          s.type?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
        );
      }

      const total = stars.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = stars.slice((page - 1) * limit, page * limit);

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
      const { data, error } = await StarModel.findById(id);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Star not found.' });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { data, error } = await StarModel.create(req.body);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Star cataloged successfully.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await StarModel.update(id, req.body);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Star not found or update failed.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Star updated successfully.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await StarModel.delete(id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Star deleted.'
      });
    } catch (err) {
      next(err);
    }
  }
};
