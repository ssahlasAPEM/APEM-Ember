import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['usr-table'],
  model: null,

  init() {
    this._super(...arguments);
  }
});
