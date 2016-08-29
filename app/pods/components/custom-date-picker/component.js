import Ember from 'ember';


export default Ember.Component.extend({
  attributeBindings: ['btnLabel', 'date', 'inputClass'],
  classNameBindings:['class', 'disabled'],
  className: 'custom-date-picker',
  date: null,


  actions:{
    clearTheDate(){
      this.$('.date-picker__button').text(null);
      this.set('date', null);
      this.sendAction('updatedDate', null);
    },
    updateDate:function(action){

      let newDate = window.moment(action._d, 'ddd MMM DD YYYY HH:mm:ss Z').format('MM/DD/YYYY');
      let searchServiceFormat = window.moment(action._d, 'ddd MMM DD YYYY HH:mm:ss Z').format('MM-DD-YYYY');
      this.$('.date-picker__button').text(newDate);
      this.set('date', newDate);
      this.sendAction('updatedDate',searchServiceFormat);
    },
    openDatepicker:function(){
      this.$(".date-picker__button").click();
    }
  }
});
