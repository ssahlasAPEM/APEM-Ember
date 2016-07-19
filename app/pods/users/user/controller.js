import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        deleteUser() {
            this.get('model').deleteRecord();
            this.transitionToRoute('users');
        }
    }
});
