import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  identity:Ember.inject.service(),
  sessionUser:null,
  instanceModal:null,

  //Andrew, comment out the method didInsertElement if you are having troubles
  //with validation on this form while I am away.
  didInsertElement(){
    this._super(...arguments);

    //Custom validation rule is used because Semantic's match rule logic does not work.
    //reference of the issue on github: Validate Dropdown Values (using match[Field]) #2214
    const myModal = Ember.$('#'+ this.elementId+' .manage-password-pop');//.elementId;
    if(this.instanceModal === null){
      this.set('instanceModal', myModal);
    }
    Ember.$('#'+ this.elementId+' .manage-password-pop .managePasswords').form.settings.rules.matchFields = function(value, fieldIdentifier) {

      var form = this;
      var matchingValue;

      if(Ember.$('[name="' + fieldIdentifier +'"]').length > 0) {
        matchingValue = form.context[0].value;
      }
      return (matchingValue !== undefined)? ( value.toString() === matchingValue.toString() ): false;
    };

    //add validation to form
    Ember.$('#'+ this.elementId+' .manage-password-pop .managePasswords')
      .form({
        inline : true,
        on:'blur',
        fields: {
           mppassword: {
            identifier:'mppassword',
            rules: [
              {
                type   : 'empty'
              }
            ]
          },
          mpPasswordVerify : {
            identifier  : 'mpPasswordVerify',
            rules: [
              {
                type   : 'matchFields[mppassword]',
                prompt : '{name} is set to "{value}" that is totally wrong. It should be {ruleValue}'
                // prompt : 'Passwords do not match."{value}"'
              }
            ]
          }
        }
    });
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

      this.instanceModal.modal({
        blurring: true
      })
      .modal('setting', 'closable', false)
      .modal('show');
    },


    submitNewPassword() {
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
