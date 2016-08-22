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

  didRender(){
    this._super(...arguments);
    let myFields = this.get('fields'),
    requiredFormValidations = {},
    fieldsArray = myFields.get('content'),
    fLen = 0;

    try {
      fLen = fieldsArray.get('length');
    } catch (e) { }

    if( fLen > 0 ){
      fieldsArray.forEach(function(item/*, index, enumerable*/){
        if (item.get('required') === true) {
          let fieldName = item.get('name');
          requiredFormValidations[fieldName] = 'empty';
            //r: for more detailed validation this structure should be used:
            // {
            //   identifier:fieldName,
            //   rules:[
            //     {
            //       type:'empty',
            //       prompt:'Please enter a ' + fieldName
            //     }
            //   ]
            // }
          // );
        }
      });

      //add validation to form
      Ember.$('.opportunity-form')
        .form({
          inline : false,
          on:'blur',
          fields: requiredFormValidations
      });

      //ensure prevent default behavior...because semantic and ember work well together on occasion..
      Ember.$('.opportunity-form').submit(function(e){
          //e.preventDefault(); usually use this, but below works best here.
          return false;
      });

    }
  },

  /** This method helps us pull the model attributes because each-in only works with JSON structured objects*/
  // attributes: Ember.computed(function() {
  //   let attrNames = [];
  //   let opt = this.get('model');
  //
  //   // Get attributes
  //   opt.eachAttribute((name) => attrNames.push(name));
  //
  //   let attrs = Ember.getProperties(opt, attrNames);
  //   return attrs;
  // }),

  actions: {
    onDropdownSelect(fieldName, selectedValue){
      let opt = this.get('model');
      opt.set(fieldName, selectedValue);
    },

    deleteOpt:function(){
      let opt = this.get('model');
      this.sendAction('onOptDelete', opt);
      // console.log('delete opt method reached!');
    },

    onCancelOptClick:function(){
      console.log('cancel opt method reached!');
    },

    updateRecord:function() {
      //Ember.$('.opportunity-form').form('validate');
      let hasErrors = Ember.$('.field.error');
      if(hasErrors.length === 0){
        // Update the opportunity
        let opt = this.get('model');
        this.set('serverErrors',[]);
        let errs = this.get('serverErrors'),
        sessionUser = this.get('identity').get('profile');
        // let myRouting = this.get('routing');
        if (opt.get('hasDirtyAttributes')) {
          opt.set('user', sessionUser);

          console.log('Updating Opportunity...');

          opt.save().then(() => {
            this.sendAction('onOptSave');
            console.log('Opportunity Saved');
          }, (error) => {
            errs.addObject(error);
          });
        }
      }
    }
  }
});
