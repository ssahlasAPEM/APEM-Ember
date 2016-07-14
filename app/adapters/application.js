import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',
  host: config.APP.apiUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
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
