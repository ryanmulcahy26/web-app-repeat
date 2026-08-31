'use strict';

import logger from "../utils/logger.js";
import movieStore from "../models/movie-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {

  createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const movies = searchTerm
        ? movieStore.searchUserMovieCollections(searchTerm, loggedInUser.id)
        : movieStore.getUserMovieCollections(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = movies;

      if (sortField) {
        sorted = movies.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Movie App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        movies: sortField ? sorted : movies,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };

      logger.debug(viewData.movies);
      response.render("dashboard", viewData);

    } else {
      response.redirect('/');
    }
  },

  addCollection(request, response) {
  const loggedInUser = accounts.getCurrentUser(request);
  logger.debug(loggedInUser.id);

  const timestamp = new Date();

  const newCollection = {
    userid: loggedInUser.id,
    id: uuidv4(),
    title: request.body.title,
    rating: parseInt(request.body.rating),
    movies: [],
    date: timestamp
  };

  movieStore.addCollection(newCollection);
  response.redirect('/dashboard');
},

  deleteCollection(request, response) {
    const collectionId = request.params.id;

    logger.debug(`Deleting Collection ${collectionId}`);

    movieStore.removeCollection(collectionId);
    response.redirect("/dashboard");
  },

};

export default dashboard;