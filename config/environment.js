/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'apem',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      apiUrl:'http://apem.local:8000'
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  //Remark Ralica M. Jul 12 2016:
  // Ember Paper uses fonts from Google Fonts, so the URL to them has to be
  //white listed. You can set this by adding to the Content Security Policy defined
  ENV.contentSecurityPolicy = {
    'connect-src': "'self' http://localhost:8000",//was "'self'",
    'default-src': "'none'",
    'script-src': "'self'",
    'font-src': "'self' http://fonts.gstatic.com",
    'img-src': "'self' data:",
    'media-src': "'self'"
  };

  //Ralica M. Jul 12 2016:
  //ENV.apiBaseUrl = 'http://apem.local:8000';



  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
