import Ember from 'ember';

export default Ember.Route.extend({

  breadCrumb: null,

  totalPagesParam: "meta.total-pages",

  model() {
    return this.store.findAll('user');
  }
});
