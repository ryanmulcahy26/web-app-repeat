'use strict';

import logger from "../utils/logger.js";

const details = {
  createView(request, response) {
    logger.info("Details page loading!");
    response.send('Details about the Playlist app');   
  },
};

export default details;