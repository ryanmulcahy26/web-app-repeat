'use strict';

import JsonStore from './json-store.js';

const empStore = {

  store: new JsonStore('./models/emp-store.json', { employees: [] }),
  collection: 'employees',

  getEmployees() {
    return this.store.findAll(this.collection);
  },

};

export default empStore;