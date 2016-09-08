import Ember from 'ember';

export default Ember.Component.extend({

  users:Ember.inject.service(),
  // tagName:'button',
  recordType:'',
  classNames:['ui', 'input'],
  model:null,
  //attributeBindings - the component properties which are bound to data from parent
  attributeBindings: ['isDisabled', 'deletableRecords', 'recordType', 'message', 'title'],
  openConfirmation:function(){
      Ember.$('.confirm-cancel-modal')
      .modal({
        blurring: true
      })
      .modal('setting', 'closable', false)
      .modal('show');
  },
  actions:{
    onCancelClick(){
      let model= this.get('model');
      if (model.get('hasDirtyAttributes')) {
        this.openConfirmation();
      } else {
        this.sendAction('confirmCancel');
      }
    },

    approveCancel:function(){
      this.sendAction('confirmCancel');
    },

    cancelConfirm(){
    }

  }
});
