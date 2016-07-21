import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('field', params.id);
  },

  afterModel(model) {
    this.set('breadCrumb', { title: model.get('label') });
  }
});
