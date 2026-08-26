'use strict';

import logger from "../utils/logger.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Movie App Dashboard"
    };
    
    response.render('dashboard', viewData);
  },
};

export default dashboard;

