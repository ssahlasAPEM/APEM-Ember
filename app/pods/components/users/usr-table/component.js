import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['usr-table'],
  model: null,

  init() {
    this._super(...arguments);
    //a place to hold all selecter records for this table
    this.selectedItems = [];
  },

  //observing the table's selectedItems to manage the delete button's disabled property
  disableDelete: function() {
    return (this.get('selectedItems').length > 0)? false:true;
  }.property('selectedItems.length'),

  actions: {
    didCreateUser(){
      console.log('CREATE USER event reached user table...passing up to the parent next !!!');
      this.get('didCreateUser')();
    },

    onSelection(record, evt){
      var selected = evt.currentTarget.checked;
      if (selected) {
        this.get('selectedItems').addObject(record);
      } else {
        this.get('selectedItems').removeObject(record);
      }
    }
  }
});
