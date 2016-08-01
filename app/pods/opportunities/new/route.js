import Ember from 'ember';

export default Ember.Route.extend({
  identity: Ember.inject.service(),

  redirect() {
    let newOpportunity = this.store.createRecord('opportunity');

    let theUser = this.get('identity').get('profile');

    newOpportunity.set('user', theUser);
    
    newOpportunity.save().then((savedOpportunity) => {
      this.transitionTo('opportunities.opportunity.detail', savedOpportunity);
    });
  }
});
