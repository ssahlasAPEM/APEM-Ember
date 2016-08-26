import Ember from 'ember';


export default Ember.Component.extend({
  attributeBindings: ['btnLabel', 'date', 'inputWidth'],
  classNameBindings:['class', 'disabled'],
  className: 'custom-date-picker',
  inputWidth:"200px",
  date: null,


  actions:{
    clearTheDate(){
      this.$('.date-picker__button').text("");
      this.set('date', null);
      this.sendAction('updatedDate', null);

      //this.$('.date-picker__wrapper').action('clearDate');
      //let a=this.$('.cust-date-field');
      // this.get('_picker').setDate(d.format())
      //debugger;
      // a[0].innerText='';
      // a.triggerAction({
      //   action:'clearDate',
      //   target: this
      // });
      // debugger;//.actions.clearDate();
      // let dC = this.$(".cust-date-field");
      // dC.setDate(null);
    },
    updateDate:function(action){
      let newDate = window.moment(action._d, 'YYYY-MM-DD').format('DD/MM/YYYY');//action._d;
      this.set('date', newDate);
      this.sendAction('updatedDate',newDate);
    },
    openDatepicker:function(){
      this.$(".date-picker__button").click();
    }
  }
});
