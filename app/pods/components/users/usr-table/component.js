import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['usr-table'],
  model: null,

  init() {
    this._super(...arguments);
    //a place to hold all selecter records for this table
    this.selectedItems = [];
    //a property controlling the disabled state of the 'Delete User' button
    // this.disableDelete = true;
  },

  disableDelete: function() {
    console.log('isDisabled?');
    return !(this.get('selectedItems').length > 0)? true:false;
  }.property('selectedItems.length'),

  actions: {
    onSelection(record, evt){
      var selected = evt.currentTarget.checked;
      console.log('on selection');
      if (selected) {
        this.get('selectedItems').addObject(record);
      } else {
        this.get('selectedItems').removeObject(record);
      }
      // var numSelected = this.get('selectedItems').length;
      // if(numSelected>0){
      //   this.set('disableDelete', false);
      // }else{
      //   this.set('disableDelete', true);
      // }
    }
  }
});
