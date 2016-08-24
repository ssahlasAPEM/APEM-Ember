import Ember from 'ember';

export default Ember.Route.extend({
  identity: Ember.inject.service(),

  breadCrumb: null,

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('fields', this.store.findAll('field'));
  },

  actions:{
    copyRecord(oldRecord){
      let attrs = oldRecord.toJSON();

      let newrec = this.get('store').createRecord('opportunity', attrs);
      let sessionUser = this.get('identity').get('profile');
      newrec.set('user', sessionUser);

      newrec.save().then((data) => {
        this.transitionTo('opportunities.opportunity.detail', data);
      }, (error) => {
        console.log(error);
      });
    },

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

    onOptSave(opt){
      let sessionUser = this.get('identity').get('profile');
      opt.set('user', sessionUser);
      opt.set('draft', false);
      console.log('Updating Opportunity...');

      opt.save().then(() => {
        this.transitionTo('opportunities');
        console.log('Opportunity Saved');
      }, (error) => {
        console.log(error);
      });

    }
  }
});
