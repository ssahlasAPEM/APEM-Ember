import DS from 'ember-data';

export default DS.Model.extend({
  created_at: DS.attr('string'),
  updated_at: DS.attr('string'),
  label: DS.attr('string'),
  type: DS.attr('string'),
  name: DS.attr('string'),
  value: DS.attr('string', { defaultValue: null }),
  options: DS.attr(),
  required: DS.attr('boolean', { defaultValue: true }),
  visible: DS.attr('boolean', { defaultValue: true }),
  group: DS.attr('string')
});
