import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('user');
  },

  actions: {
    createUser() {
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
