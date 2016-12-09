/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'apem',
    environment: environment,
    baseURL: '/',
    podModulePrefix : 'apem/pods',
    locationType: 'history',
    contentSecurityPolicy: {
      'default-src' : "'none'",
      'script-src'  : "'self' 'unsafe-inline' 'unsafe-eval' https://notify.bugsnag.com",
      'font-src'    : "'self' fonts.googleapis.com fonts.gstatic.com maxcdn.bootstrapcdn.com font-src data:;",
      'img-src'     : "'self' data:",
      'style-src'   : "'self' 'unsafe-inline' maxcdn.bootstrapcdn.com fonts.googleapis.com",
      'media-src'   : "'self' https://notify.bugsnag.com",
      'connect-src' : "'self' https://apem.local:44300 wss://ws.pusherapp.com https://notify.bugsnag.com"
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      usingCors: false,
      apiUrl: null
    }
  };

  var devContentSecurityPolicy = {
    'default-src': "'self' *",
    'script-src': "'unsafe-inline' 'unsafe-eval' 'self' https://notify.bugsnag.com *",
    'font-src': "'self' * data:;",
    'connect-src': "'self' *",
    'img-src': "'self' data: *",
    'style-src': "'unsafe-inline' 'self' *",
    'media-src': "'self' *"
  };

  if (environment === 'local') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
    ENV.APP.usingCors = true;
    ENV.APP.apiUrl = 'http://apem.local:8000';
    ENV.contentSecurityPolicy = devContentSecurityPolicy;
  }

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
    ENV.APP.usingCors = true;
    ENV.APP.apiUrl = 'http://apem.herokuapp.com';
    ENV.contentSecurityPolicy = devContentSecurityPolicy;
  }

  if (environment === 'production') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
    ENV.APP.usingCors = true;
    ENV.APP.apiUrl = 'http://nao.apem.com';
    ENV.contentSecurityPolicy = devContentSecurityPolicy;
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

  return ENV;
};
