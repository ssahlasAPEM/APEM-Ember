import Ember from 'ember';

export default Ember.Component.extend({

  users:Ember.inject.service(),

  //attributeBindings - the component properties which are bound to data from parent
  attributeBindings: ['isDisabled', 'deletableRecords', 'recordType', 'message', 'title'],

  actions:{

    openConfirmation:function(){
        Ember.$('.confirm-delete-modal')
        .modal({
          blurring: true
        })
        .modal('setting', 'closable', false)
        .modal('show');
    },

    approveDelete:function(){
      console.log('deleting records ...');
      var deletable = this.get('deletableRecords'),
      store = deletable[0].store;
      for(var i=0, dLen = deletable.length; i<dLen; i++){
        store.findRecord(this.recordType, deletable[i].id).then(function(foundRecord) {
          foundRecord.destroyRecord(); // => DELETE to /posts/2
        });
      }
    },

    cancelConfirm(){
    }

  }
});
