import Ember from 'ember';
export default Ember.Helper.helper(function([fieldLabel, attributes]) {
  return attributes[fieldLabel.toLowerCase()];
});
