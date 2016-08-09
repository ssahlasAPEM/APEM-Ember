import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

var Validations = buildValidations({
  username: {
    description: 'Username',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 5,
        max: 15
      })
    ]
  },
  password: {
    description: 'Password',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 4,
        max: 10
      }),
      validator('format', {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/,
        message: '{description} must include at least one upper case letter, one lower case letter, and a number'
      }),
      validator('length', {
        isWarning: true,
        min: 6,
        message: 'Your password is not secure.'
      })
    ]
  },
  passwordConfirmation: validator('confirmation', {
    on: 'password',
    message: 'Passwords do not match'
  })
}, {
  debounce: 500
});

export default DS.Model.extend( Validations, {
  opportunities: DS.hasMany('opportunity'),

  createdAt : DS.attr('string', { defaultValue: null }),
  updatedAt: DS.attr('string', { defaultValue: null }),
  username: DS.attr('string', { defaultValue: null }),
  password: DS.attr('string', { defaultValue: null }),
  passwordVerify: DS.attr('string', { defaultValue: null }),
  type: DS.attr('string', { defaultValue: null }),
  active: DS.attr('string', { defaultValue: true }),
  numOpportunities: DS.attr('string', { defaultValue: 0 }),
  lastLogin: DS.attr('string', { defaultValue: null }),
  selected:DS.attr('boolean', { defaultValue: false }),
});
