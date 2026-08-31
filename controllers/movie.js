'use strict';

import logger from '../utils/logger.js';
import movieStore from '../models/movie-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const movie = {

  createView(request, response) {
    const collectionId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.debug('Movie collection id = ' + collectionId);

      const collection = movieStore.getMovieCollection(collectionId);

      const sortField = request.query.sort;
      const order = request.query.order === 'desc' ? -1 : 1;

      let sortedMovies = collection.movies;

      if (sortField) {
        sortedMovies = collection.movies.slice().sort((a, b) => {

          if (sortField === 'title') {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === 'year') {
            return (a.year - b.year) * order;
          }

          return 0;
        });
      }

      collection.movies = sortedMovies;

      const viewData = {
        title: 'Movie Collection',
        collection: collection,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        titleSelected: request.query.sort === 'title',
        yearSelected: request.query.sort === 'year',
        ascSelected: request.query.order === 'asc',
        descSelected: request.query.order === 'desc',
      };

      response.render('movie', viewData);

    } else {
      response.redirect('/');
    }
  },

  addMovie(request, response) {
    const collectionId = request.params.id;

    const newMovie = {
      id: uuidv4(),
      title: request.body.title,
      director: request.body.director,
      year: parseInt(request.body.year),
      genre: request.body.genre,
    };

    movieStore.addMovie(collectionId, newMovie);
    response.redirect('/movie/' + collectionId);
  },

  deleteMovie(request, response) {
    const collectionId = request.params.id;
    const movieId = request.params.movieid;

    logger.debug(
      `Deleting Movie ${movieId} from Collection ${collectionId}`
    );

    movieStore.removeMovie(collectionId, movieId);
    response.redirect('/movie/' + collectionId);
  },

};

export default movie;