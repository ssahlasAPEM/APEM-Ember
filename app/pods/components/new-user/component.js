import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  users:Ember.inject.service(),
  userTypes: ["Admin","User"],
  model:null,


  actions:{

    openModal:function(){
      this.set('serverErrors',[]);

      var store = this.get('store'),
      newUser = store.createRecord('user');
      this.set('model',newUser);

      Ember.$('.new-user-pop')
      .modal({
        blurring: true
      })
      .modal('setting', 'closable', false)
      .modal('show');
    },

    selectUserType(type) {
      this.get('model').set('type', type);
    },

    createUser() {
      // Create the user
      let user = this.get('model');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');

      if (user.get('hasDirtyAttributes')) {
        console.log('Created User...');
        var promise = user.save(),
        me = this,
        closeModal = this.closeModal;
        promise.then(() => {
          me.get('onCreate')();
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
    Ember.$('.new-user-pop')
    .modal('hide');
  }
});
