import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings:['searchUsed', 'filterParams'],

  filterParams:null,

  // Defaults
  searchedStatus:'',
  searchedState:'',
  lastThirtyDays:false,
  dateEntered:'',
  startDate:'',
  endDate:'',
  estimatedProdDate:'',
  searchString:'',

  searchUsed:false,

  init() {
    this._super(...arguments);

    if(this.get('filterParams.lastThirtyDays') === "false" ||
      this.get('filterParams.lastThirtyDays') === false) {
      this.set('lastThirtyDays', false);
    }
    else if(this.get('filterParams.lastThirtyDays') === "true" ||
      this.get('filterParams.lastThirtyDays') === true) {
      this.set('lastThirtyDays', true);
    }

    let sStatus = this.get('filterParams.searchedStatus');
    if(sStatus !== undefined){
      this.set('searchedStatus', sStatus);
    }
    let sState = this.get('filterParams.searchedState');
    if(sState !== undefined){
      this.set('searchedState', sState);
    }
    let dE =this.get('filterParams.dateEntered');
    if(dE !== undefined){
      this.set('dateEntered', dE);
    }
    let sD =this.get('filterParams.startDate');
    if(sD !== undefined){
      this.set('startDate', sD);
    }
    let eD =this.get('filterParams.endDate');
    if(eD !== undefined){
      this.set('endDate', eD);
    }
    let ePD =this.get('filterParams.estimatedProdDate');
    if(dE !== undefined){
      this.set('estimatedProdDate', ePD);
    }
    let sString = this.get('filterParams.searchString');
    if(sString !== undefined){
      this.set('searchString', sString);
    }
  },

  didRender(){
    this._super(...arguments);
    this.$('#searchInput').value = this.get('searchString');
  },
  // click:function(event){
  //   if(event.target.id === 'dropTrigger'){
  //     let parent = event.target.offsetParent;
  //     parent.fireEvent('drop');
  //   }
  // },
  notUsingDates: function() {
    // console.log('notUsingDates triggered!!!');
    return this.get('lastThirtyDays');
  }.property('lastThirtyDays'),

  notUsingDateEntered: function() {
    // console.log('notUsingDateEntered triggered!!!');
    // let a = this.get('lastThirtyDays'),
    // b = this.get('startDate'),
    // c = this.get('endDate'),
    // d = this.get('estimatedProdDate');
    return (this.get('lastThirtyDays') === true ||
    this.get('startDate') !== '' ||
    this.get('endDate') !== '' ||
    this.get('estimatedProdDate') !== '')? true:false;
  }.property('lastThirtyDays', 'startDate', 'endDate', 'estimatedProdDate'),

  notUsingDateRange: function() {
    // console.log('notUsingDateRange triggered!!!');
    return (this.get('lastThirtyDays') === true ||
     this.get('dateEntered') !== '' ||
     this.get('estimatedProdDate') !== '')? true:false;
  }.property('lastThirtyDays', 'dateEntered', 'estimatedProdDate'),

  notUsingEstProdDate: function() {
    // console.log('manage date entered!!!');
    return (this.get('lastThirtyDays') === true ||
     this.get('dateEntered') !== '' ||
     this.get('startDate') !== '' ||
     this.get('endDate') !== '')? true:false;
  }.property('lastThirtyDays', 'dateEntered', 'startDate', 'endDate'),

  actions:{
    handleSearch(event){

      if(event.keyCode === 13) { //check if enter button was pressed
        this.set('searchString', event.target.value);
        this.doTheSearch();
      }
    },
    onDropdownBeforeShow(){
      if(event.target.id !== 'dropTrigger'){
        return false;
      }
      console.log(event.target);
    },
    pullEntireCSV(){
      this.sendAction('pullEntireCSV');
    },
    pullFilteredCSV(){
      let params = {
          lastThirtyDays:this.get('lastThirtyDays').toString(),
          dateEntered:this.get('dateEntered'),
          startDate:this.get('startDate'),
          endDate:this.get('endDate'),
          estimatedProdDate:this.get('estimatedProdDate'),
          searchedStatus:this.get('searchedStatus'),
          searchedState:this.get('searchedState'),
          searchString:this.get('searchString')
      };
      this.sendAction('pullFilteredCSV',params);
    },
    clearSearch(){
      this.toggleProperty('searchUsed');
      this.set('searchString', '');
      this.set('searchedStatus', ''),
      this.set('searchedState', ''),
      this.sendAction('clearSearchFilter');
    },
    onDateEntered(data){
      this.set('dateEntered', data);
    },
    onStartDate(data){
      this.set('startDate', data);
    },
    onEndDate(data){
      this.set('endDate', data);
    },
    onEstProductionDate(data){
      this.set('estimatedProdDate', data);
    },
    onLastThirtyChange(){
      this.toggleProperty('lastThirtyDays');
    },

    onSearchClick:function(){
      this.doTheSearch();
    }
  },

  doTheSearch:function(){
    let params = {
        perPage: '25',
        startingPage: '1',
        lastThirtyDays:this.get('lastThirtyDays').toString(),
        dateEntered:this.get('dateEntered'),
        startDate:this.get('startDate'),
        endDate:this.get('endDate'),
        estimatedProdDate:this.get('estimatedProdDate'),
        searchedStatus:this.get('searchedStatus'),
        searchedState:this.get('searchedState'),
        searchString:this.get('searchString')
    };
    if(this.get('lastThirtyDays') === false &&
      this.get('dateEntered') === '' &&
      this.get('startDate') === '' &&
      this.get('endDate') === '' &&
      this.get('estimatedProdDate') === '' &&
      this.get('searchedStatus') === '' &&
      this.get('searchedState') === '' &&
      this.get('searchString') === '' ){
        //do not sho clear search btn
    }else{
      this.toggleProperty('searchUsed');
      this.sendAction('doSearch', params);
    }
  }
});
