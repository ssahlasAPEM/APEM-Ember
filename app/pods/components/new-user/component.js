import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  isEmpty,
  computed,
  defineProperty,
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  users:Ember.inject.service(),
  userTypes: ["Admin","User"],
  model:null,

  //validation relevant attributes
  classNames: ['validated-input'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],

  init(){
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('targetObject.didValidate'),
  hasContent: computed.notEmpty('value'),
  isValid: computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: computed.oneWay('validation.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showMessage', 'hasContent', 'validation'),
  showErrorMessage: computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  }),

  showWarningMessage: computed('validation.isDirty', 'validation.warnings.[]', 'isValid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isValid') && !isEmpty(this.get('validation.warnings'));
  }),

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
