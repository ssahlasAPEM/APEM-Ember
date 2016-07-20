import Ember from 'ember';

export default Ember.Component.extend({

  users:Ember.inject.service(),

  //attributeBindings - the component properties which are bound to data from parent
  attributeBindings: ['isDisabled', 'selectedUsers'],

  actions:{

    openInviteForm:function(){
        Ember.$('.ui.modal')
        .modal({
          blurring: true
        })
        .modal('setting', 'closable', false)
        .modal('show');
    },

    approveDelete:function(){
      var deletable = this.get('selectedUsers'),
      store = deletable[0].store;
      for(var i=0, dLen = deletable.length; i<dLen; i++){
        store.findRecord('user', deletable[i].id).then(function(user) {
          user.destroyRecord(); // => DELETE to /posts/2
        });
      }
      debugger;
    },

    cancelConfirm(){
    }

  }
});
