import Ember from 'ember';

export default Ember.Controller.extend({
  defaultView:'list',
  isFiltering:false,

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

  actions:{
    showGridView:function(){
      console.log('grid view');
      this.set('defaultView','grid');
    },
    showListView:function(){
      console.log('list view');
      this.set('defaultView','list');
    }
  }
});
