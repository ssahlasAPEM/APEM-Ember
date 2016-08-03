import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['opp-table'],
  model: null,
  fields: null,
  userType:null,

  /** This method helps us pull the model attributes because each-in only works with JSON structured objects*/
  attributes: Ember.computed(function() {
    var attrNames = [];
    var opt = this.get('model');

    // Get attributes
    opt.eachAttribute((name) => attrNames.push(name));

    var attrs = Ember.getProperties(opt, attrNames);
    return attrs;
  }),

  actions: {

    onDeleteOptClick:function(){
      console.log('delete opt method reached!');
    },

    onCancelOptClick:function(){
      console.log('cancel opt method reached!');
    },

    updateOpportunity() {
      // Update the opportunity
      let opt = this.get('model');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors');

      if (opt.get('hasDirtyAttributes')) {
        console.log('Updated Opportunity...');
        opt.save().then(() => {
          this.transitionToRoute('opportunities');
        }, (error) => {
          errs.addObject(error);
        });
      }
    }
  }
});
