import DS from 'ember-data';
import {
  validator, buildValidations
}
from 'ember-cp-validations';
const Validations = buildValidations({
  username: [
    validator('presence', true),
    validator('length', {
      min: 4
    })
  ],
  password: [
    validator('presence', true),
    validator('length', {
      min: 4
    })
  ],
  passwordVerify:[
    validator('presence', true),
    validator('confirmation', {
      on: 'password',
      message: '{description} do not match',
      description: 'Passwords'
    })
  ]
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
