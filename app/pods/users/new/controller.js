import Ember from 'ember';

export default Ember.Controller.extend({
  userTypes: ["Admin","User"],
  actions: {
    selectUserType(type) {
      this.get('model').set('type', type);
    },
  }
});
