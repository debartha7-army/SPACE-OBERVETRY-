import { CelestialEventModel } from '../models/celestialEventModel.js';
import { StarModel } from '../models/starModel.js';
import { PlanetModel } from '../models/planetModel.js';
import { GalaxyModel } from '../models/galaxyModel.js';
import { NovaModel } from '../models/novaModel.js';
import { BlackHoleModel } from '../models/blackHoleModel.js';
import { TheoryModel } from '../models/theoryModel.js';
import { ArticleModel } from '../models/articleModel.js';

export const StatsController = {
  async getOverview(req, res, next) {
    try {
      const [
        eventsRes,
        starsRes,
        planetsRes,
        galaxiesRes,
        novaeRes,
        blackHolesRes,
        theoriesRes,
        articlesRes
      ] = await Promise.all([
        CelestialEventModel.findAll(),
        StarModel.findAll(),
        PlanetModel.findAll(),
        GalaxyModel.findAll(),
        NovaModel.findAll(),
        BlackHoleModel.findAll(),
        TheoryModel.findAll(),
        ArticleModel.findAll()
      ]);

      const events = eventsRes.data || [];
      const stars = starsRes.data || [];
      const planets = planetsRes.data || [];
      const galaxies = galaxiesRes.data || [];
      const novae = novaeRes.data || [];
      const blackHoles = blackHolesRes.data || [];
      const theories = theoriesRes.data || [];
      const articles = articlesRes.data || [];

      return res.status(200).json({
        success: true,
        data: {
          eventsCount: events.length,
          starsCount: stars.length,
          planetsCount: planets.length,
          galaxiesCount: galaxies.length,
          novaeCount: novae.length,
          blackHolesCount: blackHoles.length,
          theoriesCount: theories.length,
          articlesCount: articles.length,
          totalCatalogObjects: events.length + stars.length + planets.length + galaxies.length + novae.length + blackHoles.length + theories.length
        }
      });
    } catch (err) {
      next(err);
    }
  }
};
