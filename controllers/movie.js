'use strict';

import logger from '../utils/logger.js';
import movieStore from '../models/movie-store.js';
import { v4 as uuidv4 } from 'uuid';

const movie = {
  createView(request, response) {
    const movieId = request.params.id;
    logger.debug(`Movie collection id = ${movieId}`);
    
    const collection = movieStore.getMovieCollection(movieId);
    
    const viewData = {
      title: collection.title,
      collection: collection
    };
    
    response.render('movie', viewData);
  },

  addMovie(request, response) {
    const collectionId = request.params.id;
    const newMovie = {
      id: uuidv4(),
      title: request.body.title,
      director: request.body.director,
    };
    movieStore.addMovie(collectionId, newMovie);
    response.redirect('/movie/' + collectionId);
  },

  deleteMovie(request, response) {
    const collectionId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug(`Deleting Movie ${movieId} from Collection ${collectionId}`);
    movieStore.removeMovie(collectionId, movieId);
    response.redirect('/movie/' + collectionId);
  },
};

export default movie;