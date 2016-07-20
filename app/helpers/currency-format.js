import Ember from 'ember';

export function currencyFormat(params/*, hash*/) {
  var formatted = parseFloat(params, 10).toFixed(2);

  return '$' + formatted;
}

export default Ember.Helper.helper(currencyFormat);
