import Ember from 'ember';

export default Ember.Route.extend({
  identity: Ember.inject.service(),

  redirect() {
    let newOpportunity = this.store.createRecord('opportunity'),
    ident = this.get('identity');
    let theUser = ident.get('profile');

    if(ident){
      newOpportunity.set('user', theUser);

      newOpportunity.save().then((savedOpportunity) => {
        this.transitionTo('opportunities.opportunity.detail', savedOpportunity);
      });
    }else{
      theUser = this.get('identity').get('profile').then(() => {
        newOpportunity.set('user', theUser);

        newOpportunity.save().then((savedOpportunity) => {
          this.transitionTo('opportunities.opportunity.detail', savedOpportunity);
        });
      }, (error) => {
        console.log(error);
      });
    }
  }
});
