import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  identity:Ember.inject.service(),
  sessionUser:null,
  myModal:null,

  didInsertElement(){
    this._super(...arguments);

    if(this.myModal === null){
      this.set('myModal', Ember.$('#'+ this.elementId+' .manage-password-pop'));
    }
    // COMMENTING VALIDATION OUT - NOT WORKING
    //add validation to form
    // Ember.$('.managePasswords')
    //   .form({
    //     inline : true,
    //     fields: {
    //       mpPassword   : {
    //         identifier:'mpPassword',
    //         rules: [
    //           {
    //             type   : 'empty'
    //           }
    //         ]
    //       },
    //       mpPasswordVerify : {
    //         identifier  : 'mpPasswordVerify',
    //         rules: [
    //           {
    //             type   : 'match[mpPassword]',
    //             prompt : 'Passwords do not match.'
    //           }
    //         ]
    //       }
    //     }
    // });
  },

  actions:{

    openModal:function(){
      this.set('serverErrors',[]);



      let thisUserId = this.get('identity').get('profile').get('id');

      this.get('store').findRecord('user', thisUserId).then((data) => {
          this.set('sessionUser',data);
        }, (error) => {
          console.log(error);
      });

      this.myModal.modal({
        blurring: true
      })
      .modal('setting', 'closable', false)
      .modal('show');
    },


    editPassword() {
      let hasErrors = Ember.$('.error');

      if(hasErrors.length === 0){
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
      }
    },

    cancelModal:function(){
      this.closeModal();
    }
  },

  closeModal:function(){
    // this.set('sessionUser', null);
    //clear the form
    Ember.$('.managePasswords').form('clear');

    Ember.$('.manage-password-pop')
    .modal('hide');
  }

});
