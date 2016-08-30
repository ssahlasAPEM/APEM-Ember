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
      debugger;
    },
    pullEntireCSV(){
      let sUrl = '/api/v1/opportunities/csv';
      //If in Chrome or Safari - download via virtual link click
        if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
            //Creating new link node.
            var link = document.createElement('a');
            link.href = sUrl;

            if (link.download !== undefined){
                //Set HTML5 download attribute. This will prevent file from opening if supported.
                var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
                link.download = fileName;
            }

            //Dispatching click event.
            if (document.createEvent) {
                var e = document.createEvent('MouseEvents');
                e.initEvent('click' ,true ,true);
                link.dispatchEvent(e);
                return true;
            }
        }

        // Force file download (whether supported by server).
        var query = '?download';
        debugger;
        window.open(sUrl + query);
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
