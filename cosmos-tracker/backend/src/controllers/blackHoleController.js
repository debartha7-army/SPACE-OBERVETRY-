import { BlackHoleModel } from '../models/blackHoleModel.js';

export const BlackHoleController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { search } = req.query;

      const { data, error } = await BlackHoleModel.findAll({ page: 1, limit: 1000 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      let blackHoles = data || [];

      if (search) {
        const q = search.toLowerCase();
        blackHoles = blackHoles.filter(b =>
          b.name?.toLowerCase().includes(q) ||
          b.location?.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q)
        );
      }

      const total = blackHoles.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = blackHoles.slice((page - 1) * limit, page * limit);

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
      const { data, error } = await BlackHoleModel.findById(id);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Black hole not found.' });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { data, error } = await BlackHoleModel.create(req.body);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Singularity registered.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await BlackHoleModel.update(id, req.body);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Black hole not found or update failed.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Black hole updated.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await BlackHoleModel.delete(id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Black hole deleted.'
      });
    } catch (err) {
      next(err);
    }
  }
};
