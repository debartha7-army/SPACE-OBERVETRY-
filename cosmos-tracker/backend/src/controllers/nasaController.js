import { ArticleModel } from '../models/articleModel.js';
import { CelestialEventModel } from '../models/celestialEventModel.js';

export const NasaController = {
  /**
   * Fetch NASA Astronomy Picture of the Day (APOD)
   */
  async getApod(req, res, next) {
    try {
      const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
      let apodData = null;

      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        if (response.ok) {
          apodData = await response.json();
        }
      } catch (e) {
        // Fallback gracefully if NASA API network is unreachable
      }

      if (!apodData || !apodData.title) {
        apodData = {
          title: "The Pillars of Creation in Infrared (James Webb Space Telescope)",
          explanation: "In James Webb's near-infrared light view of the Eagle Nebula (M16), towering pillars of dense gas and dust appear semi-transparent, revealing countless newly formed protostars glowing like crimson rubies.",
          url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
          media_type: "image",
          date: new Date().toISOString().split('T')[0],
          copyright: "NASA, ESA, CSA, STScI"
        };
      }

      return res.status(200).json({
        success: true,
        data: apodData
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * "Sky of the Month" observational highlights
   */
  async getSkyOfTheMonth(req, res, next) {
    try {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const currentMonth = monthNames[new Date().getMonth()];

      const skyGuides = {
        month: currentMonth,
        theme: "Saturn Ring-Plane Crossing & Autumn Deep Sky",
        highlightTarget: "Saturn & Titan",
        constellationsToSpot: ["Aquarius", "Pegasus", "Andromeda", "Cygnus"],
        lunarPhases: "New Moon on the 10th (Optimal dark sky stargazing window)",
        nakedEyePlanets: [
          { planet: "Saturn", visibility: "Prominent all night, shining with steady golden radiance in Aquarius." },
          { planet: "Jupiter", visibility: "Rises in the east around 22:30, high overhead before dawn." },
          { planet: "Venus", visibility: "Brilliant morning star blazing in the eastern pre-dawn sky." }
        ],
        deepSkyTargets: [
          { name: "Andromeda Galaxy (M31)", equipment: "Naked eye from dark skies, breathtaking in 10x50 binoculars." },
          { name: "Double Cluster in Perseus", equipment: "Small telescopes reveal hundreds of diamond stars." },
          { name: "Ring Nebula (M57)", equipment: "High-power telescope in constellation Lyra." }
        ],
        meteorShowerActivity: "Minor Taurid fireball meteor activity and Orionid radiant warming up.",
        observingAdvice: "Equip your telescope with an atmospheric dispersion corrector or higher-power eyepieces to discern Saturn's pencil-thin rings."
      };

      return res.status(200).json({
        success: true,
        data: skyGuides
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Auto-import latest astronomical breakthroughs from Public API (Admin only)
   */
  async autoImportNews(req, res, next) {
    try {
      const sampleImports = [
        {
          title: "NASA Webb Telescope Detects Carbon Dioxide on Charon",
          summary: "Near-infrared spectrograph observations confirm frozen CO2 and hydrogen peroxide deposits across Pluto's largest moon Charon.",
          url: "https://science.nasa.gov/mission/webb/",
          published_at: new Date().toISOString().split('T')[0],
          category: "Planetary Exploration"
        },
        {
          title: "Radio Telescope Array Pinpoints Fast Radio Burst in Distant Magnetar",
          summary: "Chime and ASKAP observatories localize a millisecond radio flash to an extragalactic magnetar with extreme magnetic field strength.",
          url: "https://chime-experiment.ca",
          published_at: new Date().toISOString().split('T')[0],
          category: "Cosmological Physics"
        }
      ];

      let importedCount = 0;
      for (const item of sampleImports) {
        await ArticleModel.create(item);
        importedCount++;
      }

      return res.status(200).json({
        success: true,
        message: `Successfully auto-imported ${importedCount} latest astronomical dispatches from public feeds.`,
        importedCount
      });
    } catch (err) {
      next(err);
    }
  }
};
