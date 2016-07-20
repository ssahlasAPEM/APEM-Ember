import Ember from 'ember';

export default Ember.Controller.extend({
  userTypes: ["Admin","User"],
  actions: {
    selectUserType(type) {
      this.get('model').set('type', type);
    },
    createUser() {
      // Create the user
      let user = this.get('model');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');

      if (user.get('hasDirtyAttributes')) {
        console.log('Created User...');
        user.save().then(() => {
          this.transitionToRoute('users');
        }, (error) => {
          errs.addObject(error);
        });
      }
    }
  }
});
