import Ember from 'ember';

export default Ember.Route.extend({
  identity: Ember.inject.service(),
  

  redirect() {
    let astor = this.store;
    let newOpportunity = this.store.createRecord('opportunity'),
    ident = this.get('identity').get('profile');
    // let theUser = ident.get('profile');
    if(ident.content !== null){
      newOpportunity.set('user', ident);
      newOpportunity.save().then((savedOpportunity) => {
        savedOpportunity.set('newRecord', true);
        this.transitionTo('opportunities.opportunity.detail', savedOpportunity);
      });
    }else{
      let theUser = this.get('identity').get('profile').then(() => {
        newOpportunity.set('user', theUser);

        newOpportunity.save().then((savedOpportunity) => {
          savedOpportunity.set('newRecord', true);
          this.transitionTo('opportunities.opportunity.detail', savedOpportunity);
        });
      }, (error) => {
        console.log(error);
      });
    }
  }
});
