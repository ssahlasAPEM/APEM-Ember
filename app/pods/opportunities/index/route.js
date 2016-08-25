import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  totalPagesParam: "meta.total-pages",
  totalRecordsParam: "meta.total-records",
  perPage:25,
  breadCrumb: { title: 'Manage Opportunities' },

  model: function(params) {
    return Ember.RSVP.hash({
      fields: this.store.findAll('field'),
      opportunities: this.findPaged('opportunity',params)
    });
  },
  setupController(controller, models) {
    controller.set('fields', models.fields);
    controller.set('opportunities', models.opportunities);
  },
  actions:{
    pullFilteredCSV(){
      debugger;
    }
  }
});
