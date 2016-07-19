import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['usr-table'],
  model: null,

  init() {
    this._super(...arguments);
    //a place to hold all selecter records for this table
    this.selectedItems = [];
    //a property controlling the disabled state of the 'Delete User' button
    this.disableDelete = true;
  },

  actions: {
    onSelection(record, evt){
      var selected = evt.currentTarget.checked;
      record.set('selected', selected);
      if (selected) {
        this.get('selectedItems').addObject(record);
      } else {
        this.get('selectedItems').removeObject(record);
      }
      var numSelected = this.get('selectedItems').length;
      if(numSelected>0){
        this.set('disableDelete', false);
      }else{
        this.set('disableDelete', true);
      }
    },
    launchConfirmDialog() {
      this.set('confirmShown', true);
    },
    submitConfirm() {
      // trigger action on parent component
      this.set('confirmShown', false);
    },
    cancelConfirm() {
      this.set('confirmShown', false);
    }
  }
});
