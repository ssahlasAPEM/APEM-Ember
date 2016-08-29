import Ember from 'ember';
import InfinityFilter from 'apem/mixins/infinity-filter';

export default Ember.Route.extend(InfinityFilter, {
  totalPagesParam: "meta.total-pages",
  totalRecordsParam: "meta.total-records",

  breadCrumb: { title: 'Manage Opportunities' },

  fields: function() {
    return this.store.findAll('field');
  },

  model: function() {
    debugger;
    return this.infinityFilterModel("opportunity");
  },

  actions:{
    pullFilteredCSV(){
      //debugger;
    },

    // Clear old data and then load the newly queried records.
    filterOpportunities(params){
      console.log(params);
      this.store.unloadAll("opportunity");
      this.get('model');
      this.infinityModel("opportunity", params);
    },

    clearSearchFilter(){
      this.store.unloadAll("opportunity");
      this.refresh();
    }
  }
});
