'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const movieStore = {

  store: new JsonStore('./models/movie-store.json', {movieCollection: [] }),
  collection: 'movieCollection',
  array: 'movies',

  getAllMovies() {
    return this.store.findAll(this.collection);
  },

  getMovieCollection(id) {
    return this.store.findOneBy(this.collection, (c) => c.id === id);
  },

  getUserMovieCollections(userid) {
    return this.store.findBy(
      this.collection,
      (collection => collection.userid === userid)
    );
  },

  addMovie(id, movie) {
    this.store.addItem(this.collection, id, this.array, movie);
  },

  addCollection(collection) {
    this.store.addCollection(this.collection, collection);
  },

  removeMovie(id, movieId) {
    this.store.removeItem(this.collection, id, this.array, movieId);
  },

  removeCollection(id) {
    const collection = this.getMovieCollection(id);
    this.store.removeCollection(this.collection, collection);
  },

  searchMovies(search) {
    return this.store.findBy(
      this.collection,
      (collection =>
        collection.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  },

  searchUserMovieCollections(search, userid) {
    return this.store.findBy(
      this.collection,
      (collection =>
        collection.userid === userid &&
        collection.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

};

export default movieStore;