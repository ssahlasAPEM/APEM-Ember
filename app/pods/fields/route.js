import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {

  breadCrumb: null,
  totalPagesParam: "meta.total-pages",
  perPage:25,

  model: function(params) {
    // returns a PagedRemoteArray
    return this.findPaged('field',params);
  }

});