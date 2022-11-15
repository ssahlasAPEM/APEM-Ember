import Ember from 'ember';


export default Ember.Component.extend({
  attributeBindings: ['btnLabel', 'date', 'inputClass'],
  classNameBindings:['class', 'disabled'],
  className: 'custom-date-picker',
  date: null,
  formattedDate: null,

  init() {
    this._super(...arguments);

    if(this.get('date') !== null && this.get('date') !== '') {
      this.set('formattedDate', window.moment(this.get('date'), 'MM-DD-YYYY').format('MM-DD-YYYY'));
    }
  },

  actions:{
    clearTheDate(){
      this.$('.date-picker__button').text(null);
      this.set('date', '');
      this.sendAction('updatedDate', '');
    },
    updateDate:function(action){

      let newDate = window.moment(action._d, 'ddd MMM DD YYYY HH:mm:ss Z').format('MM-DD-YYYY');
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
