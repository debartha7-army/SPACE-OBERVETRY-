import { PlanetModel } from '../models/planetModel.js';

export const PlanetController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { type, search } = req.query;

      const { data, error } = await PlanetModel.findAll({ page: 1, limit: 1000 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      let planets = data || [];

      if (type && type !== 'all') {
        planets = planets.filter(p => p.type?.toLowerCase().includes(type.toLowerCase()));
      }

      if (search) {
        const q = search.toLowerCase();
        planets = planets.filter(p =>
          p.name?.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.major_moons?.toLowerCase().includes(q) ||
          (Array.isArray(p.moons_list) && p.moons_list.some(m => m.name.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q)))
        );
      }

      const total = planets.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = planets.slice((page - 1) * limit, page * limit);

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
      const { data, error } = await PlanetModel.findById(id);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Planet not found.' });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { data, error } = await PlanetModel.create(req.body);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Solar system body registered.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await PlanetModel.update(id, req.body);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Planet not found or update failed.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Planet updated.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await PlanetModel.delete(id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Planet deleted.'
      });
    } catch (err) {
      next(err);
    }
  },

  async getAllMoons(req, res, next) {
    try {
      const { data: planets, error } = await PlanetModel.findAll({ page: 1, limit: 100 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      const allMoons = [];
      (planets || []).forEach(planet => {
        if (Array.isArray(planet.moons_list)) {
          planet.moons_list.forEach(moon => {
            allMoons.push({
              ...moon,
              planet_id: planet.id,
              planet_name: planet.name,
              planet_type: planet.type
            });
          });
        }
      });

      return res.status(200).json({
        success: true,
        data: allMoons,
        totalMoonsCataloged: allMoons.length,
        totalSolarSystemMoons: (planets || []).reduce((acc, p) => acc + (p.moons || 0), 0)
      });
    } catch (err) {
      next(err);
    }
  }
};
