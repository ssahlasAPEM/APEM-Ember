import Ember from 'ember';
import InfinityFilter from 'apem/mixins/infinity-filter';
import config from './../../../config/environment';
// import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityFilter, {
  appConfig:config,
  totalPagesParam: "meta.total-pages",
  totalRecordsParam: "meta.total-records",
  isFiltering:false,

  breadCrumb: { title: 'Manage Opportunities' },

  pagingParams:{
    perPage: '25',
    startingPage: '1'
  },
  //TEST CODE
  searchedStatus:'Backburner',
  searchParams:{
    searchedStatus:'Backburner',//default
    searchedState:'Open',
    lastThirtyDays:true,
    dateEntered:'',
    startDate:'',
    endDate:'',
    estimatedProdDate:'',
    searchString:''
  },
  //END TEST CODE

  filterParams:null,

  enableFilteredCSV:function(){
    return (this.get('filterParams') === null )? true:false;
  }.property('filterParams'),

  fields: function() {
    return this.store.findAll('field');
  },

  model: function() {
    console.log(this.filterParams);
    let extraParams = this.get('filterParams'),
    pagingParams = this.get('pagingParams');

    if (this.get('isFiltering')) {
      return this.infinityModel("opportunity", extraParams);
    } else {
      return this.infinityModel("opportunity", pagingParams);
    }
  },

  actions:{
    // Clear old data and then load the newly queried records.
    filterOpportunities(params){
      // console.log(params);
      this.set('filterParams',params);
      this.set('isFiltering', true);
      this.refresh();
      // this.infinityModel("opportunity", params);
    },

    clearSearchFilter(){
      this.set('isFiltering', false);
      this.set('filterParams',null);
      this.refresh();
    },

    pullFilteredCSV(params){

      let button = Ember.$('#filteredCsvBtn');
      button.addClass('loading');

      const loginURL = this.get('appConfig').APP.apiUrl;
      var paramString = Object.keys(params).map(function(key) {
          return key + '=' + params[key];
      }).join('&');
      let url = loginURL+'/api/v1/opportunities/csv' + '?' +paramString;

      Ember.$.ajax({
          url: url
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
    }
  }
});
