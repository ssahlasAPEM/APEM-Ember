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
      let button = Ember.$('#csvBtn');
      button.addClass('loading');

      const loginURL = this.get('appConfig').APP.apiUrl;
      let filterParams = '';
      let url = loginURL+'/api/v1/opportunities/csv' + '?' +filterParams;

      Ember.$.ajax({
          url: url
          // your other details...
      }).then(function(resolve) {
        button.removeClass('loading');
        var anchor = document.createElement('a');
        anchor.href = resolve['csv-download']+'?download';
        anchor.target = '_blank';
        anchor.click();
      });
    },
    pullEntireCSV(){

      let button = Ember.$('#csvBtn');
      button.addClass('loading');

      const loginURL = this.get('appConfig').APP.apiUrl;
      let url = loginURL+'/api/v1/opportunities/csv';

      Ember.$.ajax({
          url: url
          // your other details...
      }).then(function(resolve) {
        button.removeClass('loading');
        var anchor = document.createElement('a');
        anchor.href = resolve['csv-download']+'?download';
        anchor.target = '_blank';
        anchor.click();
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
