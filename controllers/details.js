'use strict';

import logger from "../utils/logger.js";

const details = {
  createView(request, response) {
    logger.info("Details page loading!");
    response.send('Details about the Movie app');   
  },
};

export default details;