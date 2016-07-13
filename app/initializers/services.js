/*global jQuery */
import ENV from 'apem/config/environment';

export function initialize(application) {

  // Route info
  application.inject('service:route-info', 'router', 'router:main');
  application.inject('service:route-info', 'app', 'controller:application');

  if (ENV.APP.usingCors === true) {
    (function($){
      var _old = $.ajax;
      $.ajax = function() {
        var url, settings;
        var apiUrl = ENV.APP.apiUrl;
        if (arguments.length === 2) {
          url = arguments[0];
          settings = arguments[1];
        } else {
          settings = arguments[0];
        }

        settings.crossDomain = true;
        if (!settings.xhrFields) {
          settings.xhrFields = {};
        }
        settings.xhrFields.withCredentials = true;

        if (!url) {
          url = settings.url;
        }

        // If we still don't have an url, just execute the ajax request and let jQuery error out
        if (!url) {
          return _old.apply(this, [settings]);
        }

        if (!url.includes(apiUrl)) {
          if (url[0] !== '/' && apiUrl[apiUrl.length - 1] !== '/') {
            url = '/' + url;
          }
          url = apiUrl + url;
        }
        settings.url = url;
//        console.log(settings);
        return _old.apply(this, [settings]);
      };
    })(jQuery);
  }
}

export default {
  name: 'services',
  initialize: initialize
};
