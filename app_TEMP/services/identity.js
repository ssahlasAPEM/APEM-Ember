import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  profile:Ember.computed(function(){
    return this.get('store').queryRecord('profile',{});
  })
});
