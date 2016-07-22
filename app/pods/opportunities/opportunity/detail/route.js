import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: null,

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('fields', this.store.findAll('field'));
  }
});
