import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['fld-table'],
  model: null,

  init() {
    this._super(...arguments);
  }
});
