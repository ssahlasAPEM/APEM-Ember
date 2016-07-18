import Ember from 'ember';
import Table from 'ember-light-table';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['fld-table'],
  model: null,
  table: null,

  columns: computed(function() {
    return [{
      label: 'Field Name',
      valuePath: 'label',
      width: '150px',
      sortable: true
    }, {
      label: 'Type',
      valuePath: 'type',
      width: '150px',
      sortable: true
    }, {
      label: 'Required',
      valuePath: 'required',
      width: '150px',
      sortable: true
    }];
  }),

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns'), this.get('model')));
  }
});
