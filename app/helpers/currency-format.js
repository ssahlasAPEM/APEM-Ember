import Ember from 'ember';

export function currencyFormat(params/*, hash*/) {
  // var formatted = parseFloat(params, 10).toFixed(2);
  //
  // return '$' + formatted;
  var n = params[0],
      c = isNaN(c = Math.abs(params[1])) ? 2 : c,
    //  d = '.',
      t = ',',
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '',
      j = (j = i.length) > 3 ? j % 3 : 0;

      //uncomment end of return for decimals
  return '$' + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t);// + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

export default Ember.Helper.helper(currencyFormat);
