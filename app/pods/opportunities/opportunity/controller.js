import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteOpp() {
      this.get('model').deleteRecord();
      this.transitionToRoute('opportunities');
    }
  }
});
