"use strict";
import logger from "../utils/logger.js";
import movieStore from "../models/movie-store.js";
const details = {
  createView(request, response) {
    logger.info("Details page loading!");
    const collections = movieStore.getAllMovies();
    let numCollections = collections.length;
    
    let numMovies = collections.reduce((total, collection) => total + collection.movies.length, 0);
	
	  let average = numCollections > 0 ? (numMovies / numCollections).toFixed(2) : 0;

    let totalRating = collections.reduce((total, collection) => total + parseInt(collection.rating), 0);
    let avgRating = numCollections > 0 ? totalRating/numCollections : 0;

    let maxRating = Math.max(...collections.map(collection => collection.rating));
    let maxRated = collections.filter(collection => collection.rating === maxRating);
    let favTitles = maxRated.map(item => item.title);

    let maxMovies = Math.max(...collections.map(collection => collection.movies.length));
    let largestCollections = collections.filter(collection => collection.movies.length === maxMovies);
    let largestTitles = largestCollections.map(item => item.title);

    const statistics = {
      displayNumCollections: numCollections,
      displayNumMovies: numMovies,
	    displayAverage: average,
      displayAvgRating: avgRating.toFixed(2),
	    highest: maxRating,
      displayFav: favTitles,
      maxMovies: maxMovies,
      displayLargest: largestTitles
    }
    const viewData = {
      title: "Movie App Details",
      stats: statistics
    };
  
    response.render("details", viewData);
  },
};
export default details;