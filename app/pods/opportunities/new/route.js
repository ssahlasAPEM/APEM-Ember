import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    let newOpportunity = this.store.createRecord('opportunity');

    newOpportunity.save().then((savedOpportunity) => {
      this.transitionTo('opportunities.opportunity.detail', savedOpportunity);
    });
  }
});
