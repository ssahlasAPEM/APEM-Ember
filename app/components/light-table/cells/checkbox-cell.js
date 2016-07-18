import Cell from 'ember-light-table/components/cells/base';

export default Cell.extend({
  classNames: ['ember-checkbox'],

  tagName: 'input',
  type: 'checkbox',
  checked: false,
  disabled: false
});
