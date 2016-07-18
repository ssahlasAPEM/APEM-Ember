import Ember from 'ember';
import Table from 'ember-light-table';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['opp-table'],
  model: null,
  table: null,

  columns: computed(function() {
    return [{
      label: 'NAO #',
      valuePath: 'id',
      width: '60px',
      sortable: true
    }, {
      label: 'Sales Person',
      valuePath: 'apemSalesPerson',
      width: '150px',
      sortable: true
    }, {
      label: 'Revenue',
      valuePath: 'potentialAnnualRev',
      width: '150px',
      sortable: true
    }, {
      label: 'Prod Type',
      valuePath: 'productType',
      width: '150px',
      sortable: true
    }];
  }),

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns'), this.get('model')));
  }
});
