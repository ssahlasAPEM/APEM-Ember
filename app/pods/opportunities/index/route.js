import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
  totalPagesParam: "meta.total-pages",
  totalRecordsParam: "meta.total-records",
  perPage:25,
  breadCrumb: { title: 'Manage Opportunities' },

  model: function(params) {
    return Ember.RSVP.hash({
      fields: this.store.findAll('field'),
      opportunities: this.infinityModel("opportunity", { perPage: this.perPage, startingPage: 1,
        modelPath: 'controller.opportunities' }) //this.findPaged('opportunity',params)
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
