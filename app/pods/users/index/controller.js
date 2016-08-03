import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    onUserCreated(){
      console.log('USER CREATED');
      this.send('refreshModel');
    }
  }
});
