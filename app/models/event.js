import DS from 'ember-data';

export default DS.Model.extend({
  opportunity: DS.belongsTo('opportunity'),
  created_at: DS.attr('string'),
  updated_at: DS.attr('string'),
  type: DS.attr('string'),
  date: DS.attr('string')
});
