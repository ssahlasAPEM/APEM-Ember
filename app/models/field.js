import DS from 'ember-data';

export default DS.Model.extend({
  created_at: DS.attr('string'),
  updated_at: DS.attr('string'),
  label: DS.attr('string'),
  type: DS.attr('string'),
  value: DS.attr('string', { defaultValue: null }),
  options: DS.attr('string', { defaultValue: null }),
  required: DS.attr('boolean', { defaultValue: true }),
  visible: DS.attr('boolean', { defaultValue: true })
});
