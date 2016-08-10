import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  users:Ember.inject.service(),
  userTypes: ["Admin","User"],
  model:null,

  didRender(){
    Ember.$('.new-user-form')
      .form({
        inline : true,
        on: 'blur',
        fields: {
          username: {
            identifier: 'username',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter a username'
              }
            ]
          },
          password   : {
            identifier:'password',
            rules: [
              {
                type   : 'empty'
              }
            ]
          },
          passwordVerify : {
            identifier  : 'passwordVerify',
            rules: [
              {
                type   : 'match[password]',
                prompt : 'Passwords do not match.'
              }
            ]
          },
          type : {
            identifier  : 'type',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please select a dropdown value'
              }
            ]
          }
        }
      });
  },

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


    createUser() {
      
      let hasErrors = Ember.$('.error');

      if(hasErrors.length === 0){
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
