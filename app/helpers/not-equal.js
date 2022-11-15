import Ember from 'ember';

export default Ember.Helper.helper(function([leftSide, rightSide]) {
  // console.log('helper used "is-equal": '+ leftSide +' '+rightSide);
  return leftSide !== rightSide;
});
