import Ember from 'ember';

export default Ember.Route.extend({
    redirect() {
        let newUser = this.store.createRecord('user');

        newUser.save().then((savedUser) => {
            this.transitionTo('users.user.detail', savedUser);
        });
    }
});
