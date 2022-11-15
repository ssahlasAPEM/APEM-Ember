import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateField() {
      // Update the user
      let field = this.get('model');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');

      if (field.get('hasDirtyAttributes')) {
        console.log('Updated Field...'+ field.name);
        field.save().then(() => {
          this.transitionToRoute('fields');
        }, (error) => {
          errs.addObject(error);
        });
      }
    }
  }
});
