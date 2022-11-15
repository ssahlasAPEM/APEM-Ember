import Ember from 'ember';

export default Ember.Helper.helper( function(conditional, options) {
  if((conditional % 2) === 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
