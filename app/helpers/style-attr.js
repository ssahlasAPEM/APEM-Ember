import Ember from 'ember';

export function styleAttr(params/*, hash*/) {
  let styleString = '';

  params.forEach((param, index) => {
    if (index % 2 === 0) {
      styleString = styleString.concat(`${param}: `);
    } else {
      // TODO: add css escaping
      styleString = styleString.concat(`${param}; `);
    }
  });

  return Ember.String.htmlSafe(styleString);
}

export default Ember.Helper.helper(styleAttr);
