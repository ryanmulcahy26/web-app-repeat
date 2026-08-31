'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";
import details from './controllers/details.js';


import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import movie from './controllers/movie.js';
import accounts from './controllers/accounts.js';

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/movie/:id', movie.createView);
router.get('/movie/:id/deletemovie/:movieid', movie.deleteMovie);
router.get('/dashboard/deletecollection/:id', dashboard.deleteCollection);
router.get('/details', details.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/movie/:id/addmovie', movie.addMovie);
router.post('/dashboard/addcollection', dashboard.addCollection);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
