import DS from 'ember-data';

export default DS.Model.extend({
  created_at : DS.attr('string', { defaultValue: null }),
  updated_at: DS.attr('string', { defaultValue: null }),
  username: DS.attr('string')
});
