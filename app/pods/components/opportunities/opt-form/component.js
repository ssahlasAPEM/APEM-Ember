import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Component.extend({
  identity: Ember.inject.service(),
  // routing: Ember.inject.service('-routing'),

  //used addon ember-group-by to group our fields array by model attr group.
  fieldsByGroup:groupBy('fields', 'group'),
  classNames: ['opp-table'],
  model: null,
  fields: null,

  //possible opportunity stages - an array used to controll and properly render the stage steps in the form
  stages:[
    {'label':'quote', 'id':1},
    {'label':'sample', 'id':2},
    {'label':'approval', 'id':3},
    {'label':'production', 'id':4},
  ],

  /** This method helps us pull the model attributes because each-in only works with JSON structured objects*/
  attributes: Ember.computed(function() {
    let attrNames = [];
    let opt = this.get('model');

    // Get attributes
    opt.eachAttribute((name) => attrNames.push(name));

    let attrs = Ember.getProperties(opt, attrNames);
    return attrs;
  }),

  actions: {
    // softDelete: function() {
    //   this.controller.get('model').deleteRecord();
    // },
    // confirm: function() {
    //   this.controller.get('model').save();
    // },
    // undo: function() {
    //   this.controller.get('model').rollbackAttributes();
    // }
    onDeleteOptClick:function(){
      let opt = this.get('model');
      this.sendAction('onOptDelete', opt);
      console.log('delete opt method reached!');
    },

    onCancelOptClick:function(){
      console.log('cancel opt method reached!');
    },

    updateOpportunity:function() {
      // Update the opportunity
      let opt = this.get('model');
      this.set('serverErrors',[]);
      let errs = this.get('serverErrors'),
      sessionUser = this.get('identity').get('profile');
      // let myRouting = this.get('routing');
      // debugger;
      if (opt.get('hasDirtyAttributes')) {

        opt.set('user', sessionUser);

        console.log('Updating Opportunity...');
        
        opt.save().then(() => {
          this.sendAction('onOptSave');
        }, (error) => {
          errs.addObject(error);
        });
      }
    }
  }
});
