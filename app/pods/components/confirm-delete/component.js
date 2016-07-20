import Ember from 'ember';

export default Ember.Component.extend({

  users:Ember.inject.service(),

  attributeBindings: ['isDisabled'],
  
  actions:{

    openInviteForm:function(){
        Ember.$('.ui.modal')
        .modal({
          blurring: true
        })
        .modal('setting', 'closable', false)
        .modal('show');
    },

    approveDelete(){
    },

    cancelConfirm(){
    }

  }
});
