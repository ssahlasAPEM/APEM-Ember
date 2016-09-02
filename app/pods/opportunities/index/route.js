import Ember from 'ember';
//import InfinityFilter from 'apem/mixins/infinity-filter';
import config from './../../../config/environment';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
  appConfig:config,
  totalPagesParam: "meta.total-pages",
  totalRecordsParam: "meta.total-records",
  breadCrumb: { title: 'Manage Opportunities' },

  pagingParams:{
    perPage: '25',
    startingPage: '1'
  },

  filterParams:{
    searchedStatus:'',//default
    searchedState:'',
    lastThirtyDays:false,
    dateEntered:'',
    startDate:'',
    endDate:'',
    estimatedProdDate:'',
    searchString:'',
    orderBy:'',
    orderDir:''
  },

  fields: function() {
    return this.store.findAll('field');
  },

  model: function() {
    //console.log(this.filterParams);
    let extraParams = this.get('filterParams'),
    pagingParams = this.get('pagingParams');

    if (this.get('isFiltering')) {
      return this.infinityModel("opportunity", extraParams);
    } else {
      return this.infinityModel("opportunity", pagingParams);
    }
  },

  actions:{
    // Sort the table of results by re-querying the backend
    sortTable(column) {
      let me = this;
      let currFilter = this.get('filterParams');
      currFilter.orderBy = column;
      if(currFilter.orderDir === '') {
        currFilter.orderDir = 'asc';
      } else if(currFilter.orderDir === 'asc') {
        currFilter.orderDir = 'desc';
      } else {
        currFilter.orderBy = '';
        currFilter.orderDir = '';
      }

      let currColumn = null;
      switch(column) {
        case 'id':
          currColumn = Ember.$('#id_sort');
          break;
        case 'created_at':
          currColumn = Ember.$('#created_at_sort');
          break;
        case 'contact_name':
          currColumn = Ember.$('#contact_name_sort');
          break;
        case 'apem_sales_person':
          currColumn = Ember.$('#apem_sales_person_sort');
          break;
        case 'potential_annual_rev':
          currColumn = Ember.$('#potential_annual_rev_sort');
          break;
        case 'product_type':
          currColumn = Ember.$('#product_type_sort');
          break;
        case 'estimated_prod_date':
          currColumn = Ember.$('#estimated_prod_date_sort');
          break;
      }

      Ember.$('.sorted').each(function() {
        Ember.$( this ).removeClass('ascending');
        Ember.$( this ).removeClass('descending');

        if(Ember.$( this ).attr("id") === currColumn.attr("id")) {
          switch(currFilter.orderDir) {
            case '':
              break;
            case 'asc':
              Ember.$( this ).addClass('ascending');
              break;
            case 'desc':
              Ember.$( this ).addClass('descending');
              break;
          }
        }
      });

      let promisedData = this.infinityModel("opportunity", currFilter).then(function(s) {
          return s;
      });
      promisedData.then(function(data) {
         me.controller.set('model', data);
      });

//console.log(this.controller.get('model'));
      //let newData = this.infinityModel("opportunity", currFilter);
      //console.log(newData);
      //this.set('model', newData);
      //this.controller.set('model', newData);
      //this.controller.set('filterParams', currFilter);
      //this.set('filterParams', currFilter);
      //this.refresh();
    },

    // Clear old data and then load the newly queried records.
    filterOpportunities(params){
      this.controller.set('filterParams', params);
      this.controller.set('isFiltering', true);
      this.set('filterParams', params);
      this.set('isFiltering', true);
      this.refresh();
      // this.infinityModel("opportunity", params);
    },

    clearSearchFilter(){
      this.controller.set('filterParams', null);
      this.controller.set('isFiltering', false);
      this.set('filterParams', null);
      this.set('isFiltering', true);
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
        anchor.target = 'self';
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
        anchor.target = 'self';
        anchor.click();
      });
    }
  }
});
