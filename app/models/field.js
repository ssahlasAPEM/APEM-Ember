import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  created_at: attr('string'),
  updated_at: attr('string'),
  label: attr('string'),
  type: attr('string'),
  value: attr('string', { defaultValue: null }),
  options: attr('string', { defaultValue: null }),
  reuired: attr('boolean', { defaultValue: true }),
  visible: attr('boolean', { defaultValue: true })
});
