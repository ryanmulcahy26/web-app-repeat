'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import dashboard from "./controllers/dashboard.js";

const router = express.Router();

router.get('/', (request, response) => response.render('start'));

router.get('/dashboard', dashboard.createView);
router.get('/about', (request, response) => response.send('About the app page'));
router.get('/details', (request, response) => response.send('App details page'));

router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;