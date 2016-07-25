import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({
  //used addon ember-group-by to group our fields array by model attr group.
  fieldsByGroup:groupBy('fields', 'group'),

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
