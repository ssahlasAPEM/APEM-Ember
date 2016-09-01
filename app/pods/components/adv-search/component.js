import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings:['searchUsed', 'filterParams'],

  filterParams:null,

  // Defaults
  searchedStatus:'Backburner',
  searchedState:'Open',
  lastThirtyDays:false,
  dateEntered:'',
  startDate:'',
  endDate:'',
  estimatedProdDate:'',
  searchString:'',

  searchUsed:false,

  init() {
    this._super(...arguments);

    this.set('searchedStatus', this.get('filterParams.searchedStatus'));
    this.set('searchedState', this.get('filterParams.searchedState'));

    if(this.get('filterParams.lastThirtyDays') === "false" ||
      this.get('filterParams.lastThirtyDays') === false) {
      this.set('lastThirtyDays', false);
    }
    else if(this.get('filterParams.lastThirtyDays') === "true" ||
      this.get('filterParams.lastThirtyDays') === true) {
      this.set('lastThirtyDays', true);
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
    //
    // this.set('startDate', this.get('filterParams.startDate'));
    // this.set('endDate', this.get('filterParams.endDate'));
    // this.set('estimatedProdDate', this.get('filterParams.estimatedProdDate'));
    // this.set('searchString', this.get('filterParams.searchString'));
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
      this.toggleProperty('searchUsed');
      this.sendAction('doSearch', params);
      //todo write search quesry here ?
    }
  }
});

// import layout from '../templates/components/infinity-loader';
// import infinityLoader from 'ember-infinity/components/infinity-loader';
//
// export default infinityLoader.extend({
//   layout: layout
// });
