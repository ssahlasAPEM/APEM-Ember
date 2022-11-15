import Ember from 'ember';
import config from './../../config/environment';

export default Ember.Route.extend({
  appConfig:config,

  init() {
    this._super(...arguments);
    if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      // Safari caching fix
      window.onpageshow = function (event) {
        if (event.persisted) {
          window.location.reload();
        }
      };
    }
  },

  renderTemplate() {
    this._super(...arguments);
  },

  afterModel: function(model, transition){
    if (transition.targetName === "home.index"){
      this.transitionTo('opportunities');
    }
  },

  actions: {
    error(resp/*, transition*/) {
      const loginURL = this.get('appConfig').APP.apiUrl;
      if (!resp || resp && !resp.errors) {
        Ember.Logger.error(resp);
        return;
      }

      if(resp.errors.title === "Not Authorized."){
        window.location=loginURL;
      }
    }
  }
});
