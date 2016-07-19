import Ember from 'ember';

export default Ember.Route.extend({
  routeInfo: Ember.inject.service(),

  model(params) {
    return this.store.findRecord('user', params.id);
  },

  afterModel(model) {
    this.set('breadCrumb', { title: model.get('username') });
  }
});
