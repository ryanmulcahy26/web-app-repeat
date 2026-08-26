'use strict';

import express from 'express';
import logger from "./utils/logger.js";


const router = express.Router();

router.get('/', (request, response) => response.send('Welcome to the Playlist app!'));

router.get('/dashboard', (request, response) => {
  const playlist = [
    { id: 1, title: "Piano Sonata No. 3", artist: "Beethoven" },
    { id: 2, title: "Piano Sonata No. 7", artist: "Beethoven" },
    { id: 3, title: "Piano Sonata No. 10", artist: "Beethoven" }
  ];
  response.json(playlist);
});
router.get('/about', (request, response) => response.send('About the app page'));
router.get('/details', (request, response) => response.send('App details page'));

router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;