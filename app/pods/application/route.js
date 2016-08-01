import Ember from 'ember';

export default Ember.Route.extend({
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
  }
});
