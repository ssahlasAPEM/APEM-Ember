import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['btnLabel'],
  classNameBindings:['class'],

  actions:{
    updateDate:function(){

    },
    openDatepicker:function(){
      this.$(".date-picker__button").click();
    }
  }
});
