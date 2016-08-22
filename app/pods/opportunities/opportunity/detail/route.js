import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: null,

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('fields', this.store.findAll('field'));
  },

  actions:{
    onDelete(optRecord){
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');
      optRecord.destroyRecord().then(() => {
        this.transitionTo('opportunities');
        // myRouting.transitionToRoute('opportunities');
      }, (error) => {
        errs.addObject(error);
      });
    },
    onOptSave(){
      this.transitionTo('opportunities');
    }
  }
});
