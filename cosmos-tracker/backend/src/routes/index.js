import express from 'express';
import authRoutes from './authRoutes.js';
import eventRoutes from './eventRoutes.js';
import starRoutes from './starRoutes.js';
import planetRoutes from './planetRoutes.js';
import galaxyRoutes from './galaxyRoutes.js';
import novaRoutes from './novaRoutes.js';
import blackHoleRoutes from './blackHoleRoutes.js';
import theoryRoutes from './theoryRoutes.js';
import articleRoutes from './articleRoutes.js';
import favoriteRoutes from './favoriteRoutes.js';
import observationRoutes from './observationRoutes.js';
import statsRoutes from './statsRoutes.js';
import nasaRoutes from './nasaRoutes.js';
import dispatchRoutes from './dispatchRoutes.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/celestial-events', eventRoutes);
apiRouter.use('/events', eventRoutes);
apiRouter.use('/stars', starRoutes);
apiRouter.use('/planets', planetRoutes);
apiRouter.use('/galaxies', galaxyRoutes);
apiRouter.use('/novae-variables', novaRoutes);
apiRouter.use('/novae', novaRoutes);
apiRouter.use('/black-holes', blackHoleRoutes);
apiRouter.use('/theories', theoryRoutes);
apiRouter.use('/articles', articleRoutes);
apiRouter.use('/favorites', favoriteRoutes);
apiRouter.use('/bookmarks', favoriteRoutes);
apiRouter.use('/observations', observationRoutes);
apiRouter.use('/stats', statsRoutes);
apiRouter.use('/nasa', nasaRoutes);
apiRouter.use('/dispatches', dispatchRoutes);
apiRouter.use('/research', dispatchRoutes);

export default apiRouter;
