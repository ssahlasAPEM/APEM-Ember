import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('opportunity', params.id);
  },

  afterModel(model) {
    this.set('breadCrumb', { title: "NAO # " + model.get('id') });
  }
});
