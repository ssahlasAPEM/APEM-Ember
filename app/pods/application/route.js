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
    this.render('nav-sidebar', { into: 'application', outlet: 'nav-sidebar' });
  },

  actions: {
    loading(transition) {
      Ember.run.scheduleOnce('afterRender', this, () => {
        Ember.$('#application-loader').addClass('fade-show').removeClass('fade-hide');
      });
      transition.promise.finally(() => {
        Ember.run.scheduleOnce('afterRender', this, () => {
          Ember.$('#application-loader').addClass('fade-hide').removeClass('fade-show');
        });
      });
    }
  }
});
