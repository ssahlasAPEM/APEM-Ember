import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

this.IndexRoute = Ember.Route.extend({
    redirect: function() {
        // this redirects / to /dashboard
        this.transitionTo('opportunities');
    }
});

Router.map(function() {
  this.route('home', { path: '/', resetNamespace: true }, function () {

    /* Users Routes */
    this.route('users', { resetNamespace: true }, function () {
      this.route('user', { path: ':id' }, function () {
        this.route('detail', { path: 'detail' });
      });
      this.route('new', {});
    });

    /* Opportunities Routes */
    this.route('opportunities', { resetNamespace: true }, function () {
      this.route('opportunity', { path: ':id' }, function () {
        this.route('detail', { path: 'detail' });
        // 404 it is
        this.route('page-not-found',{path:'/*wildcard'});
      });
      this.route('new', {});
      // 404 it is
      this.route('page-not-found',{path:'/*wildcard'});
    });

    /* Fields Routes */
    this.route('fields', { resetNamespace: true }, function () {
      this.route('field', { path: ':id' }, function () {
        this.route('detail', { path: 'detail' });
      });
      this.route('new', {});
    });

    /* User Settings Routes */
    this.route('profile', { resetNamespace: true });

    // 404 it is
    this.route('page-not-found',{path:'/*wildcard'});
  });
});

Ember.Router.reopen({ rootURL: '/dashboard' });

export default Router;
