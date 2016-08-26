import Ember from 'ember';

export default Ember.Component.extend({

  searchedStatus:'Backburner',//default
  searchedState:'Open',
  lastThirtyDays:true,
  dateEntered:null,
  startDate:null,
  endDate:null,
  estimatedProdDate:null,

  notUsingDates: function() {
    console.log('disabled change!!!');
    return this.get('lastThirtyDays');
  }.property('lastThirtyDays'),

  notUsingDateEntered: function() {
    console.log('manage date entered!!!');
    return (this.get('lastThirtyDays') === true ||
    this.get('startDate') !== null ||
    this.get('endDate') !== null ||
    this.get('estimatedProdDate') !== null)? true:false;
  }.property('lastThirtyDays', 'startDate', 'endDate', 'estimatedProdDate'),

  notUsingDateRange: function() {
    console.log('manage date entered!!!');
    return (this.get('lastThirtyDays') === true ||
    this.get('dateEntered') !== null ||
    this.get('estimatedProdDate') !== null)? true:false;
  }.property('lastThirtyDays', 'dateEntered', 'estimatedProdDate'),

  notUsingEstProdDate: function() {
    console.log('manage date entered!!!');
    return (this.get('lastThirtyDays') === true ||
    this.get('dateEntered') !== null ||
    this.get('startDate') !== null ||
    this.get('endDate') !== null)? true:false;
  }.property('lastThirtyDays', 'dateEntered', 'startDate', 'endDate'),

  actions:{
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
      debugger;
      this.set('estimatedProdDate', data);
    },
    onLastThirtyChange(value){
      this.toggleProperty('lastThirtyDays');
    },

    onSearchClick:function(){
      let params = {

      };
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
