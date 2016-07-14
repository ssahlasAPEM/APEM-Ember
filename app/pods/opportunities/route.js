import Ember from 'ember';

export default Ember.Route.extend({

  breadCrumb: null,

  totalPagesParam: "meta.total-pages",
  perPage:25,

  model(params) {
    return this.store.findAll('opportunity', params);
  }
});
