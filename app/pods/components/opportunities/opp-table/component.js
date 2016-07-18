import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['opp-table'],
  model: null,

  init() {
    this._super(...arguments);
  }
});
