import Ember from 'ember';

export default Ember.Route.extend({
  identity: Ember.inject.service(),

  redirect() {
    let newOpportunity = this.store.createRecord('opportunity');
    //let profile = this.get('identity');
    let theUser = this.get('identity').get('profile');
    //console.log( JSON.stringify(identity.profile.username) );
    //newOpportunity.user = identity;
    console.log(theUser);

    newOpportunity.save().then((savedOpportunity) => {
      this.transitionTo('opportunities.opportunity.detail', savedOpportunity);
    });
  }
});
