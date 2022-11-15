import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: null,
  setupController(controller, model) {
    controller.set('model', model);
  },
  actions: {
    selectUserType(type) {

      this.get('model').set('type', type);
    },

    editUser() {
      // Create the user
      let user = this.controller.get('model');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');
      
      if (user.get('hasDirtyAttributes')) {
        console.log('Created User...');
        user.save().then(() => {
          this.transitionTo('users');
        }, (error) => {
          errs.addObject(error);
        });
      }
    }
  }
});
