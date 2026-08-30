'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const movieStore = {

  store: new JsonStore('./models/movie-store.json', { movieCollection: [] }),
  collection: 'movieCollection',
  array: 'movies',

  getAllMovies() {
    return this.store.findAll(this.collection);
  },

};

export default movieStore;
