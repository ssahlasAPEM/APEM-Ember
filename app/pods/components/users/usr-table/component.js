import Ember from 'ember';
import Table from 'ember-light-table';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['usr-table'],
  model: null,
  table: null,

  columns: computed(function() {
    return [{
      valuePath: 'id',
      width: '60px',
      sortable: false,
      cellComponent: 'users/edit-checkbox'
    }, {
      label: 'Username',
      valuePath: 'username',
      width: '60px',
      sortable: true
    }, {
      label: 'Type',
      valuePath: 'type',
      width: '150px',
      sortable: true
    }, {
      label: 'Opportunities',
      valuePath: 'numOpportunities',
      width: '150px',
      sortable: true
    }, {
      label: 'Active',
      valuePath: 'active',
      width: '150px',
      sortable: true,
      cellComponent: 'users/active-checkbox'
    }];
  }),

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns'), this.get('model')));
  }
});
