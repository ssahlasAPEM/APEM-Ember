import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  created_at: attr('string'),
  last_updated_by: attr('string'),
  updated_at: attr('string'),
  owner_id: attr('number', { defaultValue: null }),
  username: attr('string')
});
