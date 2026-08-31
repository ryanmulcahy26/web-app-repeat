'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import movie from './controllers/movie.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/movie/:id', movie.createView);
router.get('/movie/:id/deletemovie/:movieid', movie.deleteMovie);
router.get('/dashboard/deletecollection/:id', dashboard.deleteCollection);
router.post('/movie/:id/addmovie', movie.addMovie);
router.post('/dashboard/addcollection', dashboard.addCollection);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
