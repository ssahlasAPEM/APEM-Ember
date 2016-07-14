import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  // optional. default is 10
  perPage: 25,

  model: function(params) {
    // todo is your model name
    // returns a PagedRemoteArray
    return this.findPaged('user',params);
  }
});

// export default Ember.Route.extend({
//
//   breadCrumb: null,
//
//   totalPagesParam: "meta.total-pages",
//
//   model() {
//     return this.store.findAll('user');
//   }
// });
