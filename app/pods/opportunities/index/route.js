import Ember from 'ember';
import InfinityFilter from 'apem/mixins/infinity-filter';
// import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityFilter, {
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
      //debugger;
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
