import Ember from 'ember';
import InfinityFilter from 'apem/mixins/infinity-filter';
import config from './../../../config/environment';
// import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityFilter, {
  appConfig:config,
  totalPagesParam: "meta.total-pages",
  totalRecordsParam: "meta.total-records",

  breadCrumb: { title: 'Manage Opportunities' },

  filterParams:null,

  pagingParams:{
    perPage: 25,
    startingPage: 1
  },

  fields: function() {
    return this.store.findAll('field');
  },

  model: function() {
    console.log(this.filterParams);
    return this.infinityFilterModel("opportunity");
  },

  actions:{


    pullFilteredCSV(){
      debugger;
    },
    pullEntireCSV(button){
      debugger;
      const loginURL = this.get('appConfig').APP.apiUrl;
      let url = loginURL+'/api/v1/opportunities/csv';
      Ember.$.ajax({
          url: url
          // your other details...
      }).then(function(resolve) {
        Ember.$.ajax({
            url: resolve['csv-download']+'?download'
            // your other details...
        });
        // this.set('controller.isLoading', false);
          // process the result...
      });
    },
    // Clear old data and then load the newly queried records.
    filterOpportunities(params){
      console.log(params);
      this.infinityFilterModel("opportunity", params).then(function(data){
        debugger;
        // this.get('store').pushPayload(data);
      });
    },

    clearSearchFilter(){
      this.infinityFilterModel("opportunity");
    }
  }
});
