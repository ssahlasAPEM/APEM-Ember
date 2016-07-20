import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateOpportunity() {
      // Update the user
      let user = this.get('model');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');

      if (user.get('hasDirtyAttributes')) {
        console.log('Updated Opportunity...');
        user.save().then(() => {
          this.transitionToRoute('opportunities');
        }, (error) => {
          errs.addObject(error);
        });
      }
    }
  }
});
