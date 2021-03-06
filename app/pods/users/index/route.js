import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  totalPagesParam: "meta.total-pages",
  totalRecordsParam: "meta.total-records",
  perPage: 25,
  breadCrumb: { title: 'User Management' },

  model: function(params) {
    // returns a PagedRemoteArray
    return this.findPaged('user',params);
  },
  actions: {
    refreshModel: function() {
      this.refresh();
    }
  }
});
