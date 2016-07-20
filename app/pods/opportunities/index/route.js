import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  totalPagesParam: "meta.total-pages",
  perPage:25,
  breadCrumb: { title: 'Manage Opportunities' },

  model: function(params) {
    // returns a PagedRemoteArray
    return this.findPaged('opportunity',params);
  }
});
