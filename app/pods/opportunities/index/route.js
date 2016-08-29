import Ember from 'ember';
import InfinityFilter from 'apem/mixins/infinity-filter';

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
    return this.infinityModel("opportunity", this.pagingParams);
  },

  actions:{
    pullFilteredCSV(){
      //debugger;
    },

    // Clear old data and then load the newly queried records.
    filterOpportunities(params){
      console.log(params);
      // this.set('filterParams', params);
      // this.store.unloadAll("opportunity");
      //debugger;
      this.infinityModel("opportunity", params);
      // {
      //   perPage: 25,
      //   startingPage: 1,
      //   dateEntered:params.dateEntered,
      //   endDate:params.endDate,
      //   estimatedProdDate:params.estimatedProdDate,
      //   lastThirtyDays:params.lastThirtyDays,
      //   searchString:params.searchString,
      //   searchedState:params.searchedState,
      //   searchedStatus:params.searchedStatus,
      //   startDate:params.startDate
      // });
      //this.infinityModel("opportunity", params);
    },

    clearSearchFilter(){
      this.infinityModel("opportunity", this.pagingParams, null);
    }
  }
});
