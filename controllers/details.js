'use strict';

import logger from "../utils/logger.js";
import movieStore from "../models/movie-store.js";
import accounts from "./accounts.js";
import userStore from "../models/user-store.js";

const details = {

  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Details page loading!");

      const collections = movieStore.getUserMovieCollections(
        loggedInUser.id
      );

      const users = userStore.getAllUsers();
      let numUsers = users.length;

      let numCollections = collections.length;

      let numMovies = collections.reduce(
        (total, collection) => total + collection.movies.length,
        0
      );

      let average = numCollections > 0
        ? (numMovies / numCollections).toFixed(2)
        : 0;

      let totalRating = collections.reduce(
        (total, collection) => total + parseInt(collection.rating),
        0
      );

      let avgRating = numCollections > 0
        ? totalRating / numCollections
        : 0;

      let maxRating = collections.length > 0
        ? Math.max(...collections.map(collection => collection.rating))
        : 0;

      let maxRated = collections.filter(
        collection => collection.rating === maxRating
      );

      let favTitles = maxRated.map(item => item.title);

      let longestSize = collections.length > 0
        ? Math.max(...collections.map(
            collection => collection.movies.length
          ))
        : 0;

      let longestCollections = collections.filter(
        collection => collection.movies.length === longestSize
      );

      let longestCollectionTitles = longestCollections.map(
        item => item.title
      );

      const statistics = {
        displayNumCollections: numCollections,
        displayNumMovies: numMovies,
        displayAverage: average,
        displayAvgRating: avgRating,
        highest: maxRating,
        displayFav: favTitles,
        longest: longestSize,
        longestTitles: longestCollectionTitles,
        displayNumUsers: numUsers,
      };

      const viewData = {
        title: "Movie App Statistics",
        stats: statistics,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      response.render("details", viewData);

    } else {
      response.redirect('/');
    }
  },

};

export default details;