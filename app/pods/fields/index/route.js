import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: { title: 'Form Management' },

  model: function(params) {
    return this.get('store').findAll('field');
  }
});
