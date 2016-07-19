import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: null,

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
    }
  },

  setupController() {
    this._super(...arguments);

    Ember.run.scheduleOnce('render', this, function() {
      Ember.$('.inner #details-loader').show();
      Ember.$('.inner .details.preload').removeClass('loaded');
    });
  },

  actions: {
    updateUser() {
      // Create the user
      let user = this.controller.get('model');

      if (user.get('hasDirtyAttributes')) {
        user.save().then((savedUser) => {
            this.transitionTo('users.user.detail', savedUser);
        });
      }
    }
  }
});
