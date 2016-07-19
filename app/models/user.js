import DS from 'ember-data';

export default DS.Model.extend({
  opportunities: DS.hasMany('opportunity'),

  createdAt : DS.attr('string', { defaultValue: null }),
  updatedAt: DS.attr('string', { defaultValue: null }),
  username: DS.attr('string', { defaultValue: null }),
  type: DS.attr('string', { defaultValue: null }),
  active: DS.attr('string', { defaultValue: null }),
  numOpportunities: DS.attr('string', { defaultValue: null }),
  selected:DS.attr('boolean', { defaultValue: false }),
});
