import { GalaxyModel } from '../models/galaxyModel.js';

export const GalaxyController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { type, search } = req.query;

      const { data, error } = await GalaxyModel.findAll({ page: 1, limit: 1000 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      let galaxies = data || [];

      if (type && type !== 'all') {
        galaxies = galaxies.filter(g => g.type?.toLowerCase().includes(type.toLowerCase()));
      }

      if (search) {
        const q = search.toLowerCase();
        galaxies = galaxies.filter(g =>
          g.name?.toLowerCase().includes(q) ||
          g.type?.toLowerCase().includes(q) ||
          g.description?.toLowerCase().includes(q)
        );
      }

      const total = galaxies.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = galaxies.slice((page - 1) * limit, page * limit);

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
      const { data, error } = await GalaxyModel.findById(id);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Galaxy not found.' });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { data, error } = await GalaxyModel.create(req.body);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Galaxy cataloged successfully.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await GalaxyModel.update(id, req.body);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Galaxy not found or update failed.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Galaxy updated.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await GalaxyModel.delete(id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Galaxy deleted.'
      });
    } catch (err) {
      next(err);
    }
  }
};
