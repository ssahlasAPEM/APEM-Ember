import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['opp-table'],
  model: null,
  fields: null,

  /** This method helps us pull the model attributes because each-in only works with JSON structured objects*/
  attributes: Ember.computed(function() {
    var attrNames = [];
    var opt = this.get('model');

    // Get attributes
    opt.eachAttribute((name) => attrNames.push(name));

    var attrs = Ember.getProperties(opt, attrNames);
    return attrs;
  })
});
