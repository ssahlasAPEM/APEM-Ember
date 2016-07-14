import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    willTransition(/* transition */) {
      // Make sure current account is saved
      let user = this.controller.get('model');

      if (user.get('hasDirtyAttributes')) {
        // transition.abort();
        user.save();
        /* .then(() => {
         transition.retry();
         }, (error) => {
         alert(`${error}`);
         });*/
      }

      user.get('custom').forEach((customField) => {
        if (customField.get('hasDirtyAttributes')) {
          customField.save();
        }
      });
    }

  },

  setupController(controller, models) {
    this._super(...arguments);

    Ember.run.scheduleOnce('render', this, function() {
      Ember.$('.inner #details-loader').show();
      Ember.$('.inner .details.preload').removeClass('loaded');
    });

    Ember.RSVP.makePromise = function(maybePromise) {
      // Test if it's a promise
      if (maybePromise.then) {
        // Then return it
        return maybePromise;
      } else {
        // Wrap it in a Promise that resolves directly
        return Ember.RSVP.resolve(maybePromise);
      }
    };

    let customData = models.get('custom');

    // Wait until the promise has been resolved
    customData.then(function() {
      Ember.run.scheduleOnce('afterRender', this, function() {
        Ember.$('.inner #details-loader').hide();
        Ember.$('.inner .details.preload').addClass('loaded');
      });
    });
  }
});
