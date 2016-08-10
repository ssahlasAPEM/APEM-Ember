import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  identity:Ember.inject.service(),
  sessionUser:null,

  actions:{

    openModal:function(){
      this.set('serverErrors',[]);
      this.set('sessionUser', null);

      let thisUserId = this.get('identity').get('profile').get('id');
      this.get('store').findRecord('user', thisUserId).then((data) => {
          this.set('sessionUser',data);
        }, (error) => {
          console.log(error);
      });

      Ember.$('.manage-password-pop')
      .modal({
        blurring: true
      })
      .modal('setting', 'closable', false)
      .modal('show');
    },


    editPassword() {
      let user = this.get('sessionUser');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');
      if (user.get('hasDirtyAttributes')) {
        let closeModal = this.closeModal;
        user.save().then(() => {
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
