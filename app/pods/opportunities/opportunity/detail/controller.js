import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({
  //used addon ember-group-by to group our fields array by model attr group.
  fieldsByGroup:groupBy('fields', 'group')
});
