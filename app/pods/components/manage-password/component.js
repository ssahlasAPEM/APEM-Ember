import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  identity:Ember.inject.service(),
  model:null,

  actions:{

    openModal:function(){
      this.set('serverErrors',[]);

      let thisUserId = this.get('identity').get('profile').get('id'),
      thisUser = this.get('store').findRecord('user', thisUserId);
      // debugger;
      this.set('model',thisUser);

      Ember.$('.manage-password-pop')
      .modal({
        blurring: true
      })
      .modal('setting', 'closable', false)
      .modal('show');
    },


    editPassword() {
      // Create the user
      let user = this.get('model');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');

      if (user.get('hasDirtyAttributes')) {
        let closeModal = this.closeModal;
        this.get('model').save().then(() => {
          closeModal();
        }, (error) => {
          errs.addObject(error);
        });
      }
    },

    cancelModal:function(){
      this.closeModal();
    }

  },

  closeModal:function(){
    Ember.$('.manage-password-pop')
    .modal('hide');
  }
});
