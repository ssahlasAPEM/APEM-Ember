import Ember from 'ember';

export default Ember.Route.extend({
    routeInfo: Ember.inject.service(),

    redirect() {
        //let currentRoutes = this.get('routeInfo.currentRouteNames');

        this.transitionTo('users.user.detail');
    }
});
