import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
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
      });
      this.route('new', {});
    });

  });
  this.route('fields');
});

Ember.Router.reopen({ rootURL: '/' });

export default Router;
