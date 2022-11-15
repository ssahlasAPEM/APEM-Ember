import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui','menu','nav-header-menu','nav-header'],
  identity: Ember.inject.service(),
  router: Ember.inject.service("-routing"),

  //observe changes to the router
  didInsertElement: function() {
    let r = this.get("router");
    r.addObserver("currentRouteName", this, "onRouteChange");
  },

  //when the router is in opportunity.detail - hide the new NAO button
  "onRouteChange": function(router) {
    let newNAObtn = Ember.$('.new-nao-btn');
    // console.log("Current route", router.get("currentRouteName"));
    if(router.get("currentRouteName") === 'opportunities.opportunity.detail'){
      newNAObtn.addClass('hide-me');
    }else{
      newNAObtn.removeClass('hide-me');
    }
  }
});
