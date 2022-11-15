import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend({
  namespace: 'api/v1',
  host: ENV.APP.apiUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type':'application/vnd.api+json'
  },
  ajax(url, method, hash) {
    if (ENV.APP.usingCors) {
      if (hash === undefined) { hash = {}; }

      hash.crossDomain = true;
      hash.xhrFields = { withCredentials: true };
    }

    return this._super(url, method, hash);
  }
});
