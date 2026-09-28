import { NovaModel } from '../models/novaModel.js';

export const NovaController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { kind, search } = req.query;

      const { data, error } = await NovaModel.findAll({ page: 1, limit: 1000 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      let novae = data || [];

      if (kind && kind !== 'all') {
        novae = novae.filter(n => n.kind?.toLowerCase().includes(kind.toLowerCase()));
      }

      if (search) {
        const q = search.toLowerCase();
        novae = novae.filter(n =>
          n.name?.toLowerCase().includes(q) ||
          n.kind?.toLowerCase().includes(q) ||
          n.description?.toLowerCase().includes(q)
        );
      }

      const total = novae.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = novae.slice((page - 1) * limit, page * limit);

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
      const { data, error } = await NovaModel.findById(id);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Nova or variable star not found.' });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { data, error } = await NovaModel.create(req.body);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Nova / Variable star cataloged successfully.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await NovaModel.update(id, req.body);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Nova not found or update failed.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Nova / Variable star updated.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await NovaModel.delete(id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Nova deleted.'
      });
    } catch (err) {
      next(err);
    }
  }
};
