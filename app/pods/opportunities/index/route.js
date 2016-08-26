import Ember from 'ember';
import InfinityFilter from 'apem/mixins/infinity-filter';

export default Ember.Route.extend(InfinityFilter, {
  totalPagesParam: "meta.total-pages",
  totalRecordsParam: "meta.total-records",

  breadCrumb: { title: 'Manage Opportunities' },

  fields: function() {
    return this.store.findAll('field');
  },

  model: function(params) {
    return this.infinityFilterModel("opportunity");
  },
  
  actions:{
    pullFilteredCSV(){
      //debugger;
    }
  }
});
