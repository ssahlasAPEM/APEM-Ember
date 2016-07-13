import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';

export default JSONAPIAdapter.extend({
  namespace: 'api/v1',
  //uses .ENV variable to target a particular server.
  //config.APP.apiUrl defined in initializers services.js
  host: config.APP.apiUrl,

  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'ContentType':'dnd.api+json',
    'Access-Control-Allow-Origin': '*'
  },

  ajax(url, method, hash) {
    if (config.APP.usingCors) {
      if (hash === undefined) { hash = {}; }

      hash.crossDomain = true;
      hash.xhrFields = { withCredentials: true };
    }

    return this._super(url, method, hash);
  }

});
