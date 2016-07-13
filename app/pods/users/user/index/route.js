import Ember from 'ember';

export default Ember.Route.extend({
    routeInfo: Ember.inject.service(),

    redirect() {
        let currentRoutes = this.get('routeInfo.currentRouteNames');

        if (currentRoutes.contains('users.user.journey')) {
            this.transitionTo('users.user.journey');
        }

        this.transitionTo('users.user.detail');

    }
});
