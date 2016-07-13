import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', { path: '/', resetNamespace: true }, function () {

    /* Users  Routes */
    this.route('users');
  });
});

export default Router;
