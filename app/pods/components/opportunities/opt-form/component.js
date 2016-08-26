import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Component.extend({
  identity: Ember.inject.service(),
  store: Ember.inject.service(),
  // routing: Ember.inject.service('-routing'),

  //used addon ember-group-by to group our fields array by model attr group.
  fieldsByGroup:groupBy('fields', 'group'),
  classNames: ['opp-table'],
  model: null,
  fields: null,
  users: null,
  optStatuses:['Backburner', 'Won', 'Lost'],

  //possible opportunity stages - an array used to controll and properly render the stage steps in the form
  stages:[
    {'label':'quote', 'id':1},
    {'label':'sample', 'id':2},
    {'label':'approval', 'id':3},
    {'label':'production', 'id':4},
  ],

  // Init function
  init() {
    this._super(...arguments);
  },

  // OBSERVERS ---------------------

  //observing the table's hasDirtyAttributes to manage the delete button's disabled property
  hasNoChanges: function() {
    let model = this.get('model');
    if (model.get('hasDirtyAttributes') || model.get('draft')) {
      return false;
    } else {
      return true;
    }
  }.property('model.hasDirtyAttributes'),

  /* This property is used by the template to disable the opportunity status Won
  button unless the opportunity has a "sales order number" and a "company name" */
  isWinDisabled: function() {
    let m=this.get('model');
    this.manageWonSettings(m);
    return (m.get('company')!== null && m.get('company')!== '' &&
     m.get('prodSalesOrderNum')!== null && m.get('prodSalesOrderNum')!== '')? false:true;
  }.property('model.company', 'model.prodSalesOrderNum'),

  //HOOKS ----
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
      Ember.$('.opportunity-form').submit(function(/*e*/){
          //e.preventDefault(); usually use this, but below works best here.
          return false;
      });

    }
  },

  //METHODS

  /* This property is used by the template to disable the opportunity delete
  button unless the user is an Admin */
  disableDelete:function() {
    console.log(this.get('identity').get('profile').get('type'));

    return (this.get('identity').get('profile').type === 'Admin')? false:true;
  }.property('identity'),

  noValidName:function() {
    let m = this.get('model');
    return (m.get('company') !== '' && m.get('company') !== null && m.get('company') !== undefined)? false:true;
  }.property('model.company'),

  manageWonSettings:function(model){
    if (!(model.get('company')!== null && model.get('company')!== '' &&
     model.get('prodSalesOrderNum')!== null && model.get('prodSalesOrderNum')!== '')) {
       model.set('status', 'Backburner');
      //  alert('Won can be assigned only if there are a Company and a Product Sales Number values.');
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
    onStatusChange(button){
      let allStatusButtons = this.get('optStatuses');

      for(var statBtn in allStatusButtons){
        if (button.value === allStatusButtons[statBtn]) {
          Ember.$('#'+button.id).addClass('active');
        } else {
          Ember.$('#'+button.id).removeClass('active');
        }
      }
      let mymodel = this.get('model');
      mymodel.set('status', button.value);
    },
    /* Copies the current record to create a new one */
    cloneRecord(){
      let oldModel = this.get('model');
      this.sendAction('onCopy', oldModel);
    },

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
      this.get('model').rollbackAttributes();
      console.log('cancel opt method reached!');
    },

    saveDraft(){
      let opt = this.get('model');
      //failsafe
      if(opt.get('company') === '' || opt.get('company') === null || opt.get('company') === undefined) { return; }
      opt.set('draft',true);
      opt.set('newRecord', false);
      this.doSave();
    },

    updateRecord:function() {
      this.doSave();
    }
  },

  doSave:function(){
    //Ember.$('.opportunity-form').form('validate');
    let opt = this.get('model');
    let hasErrors = Ember.$('.field.error');
    //form saves if there are no missing required fields, or if it's a draft.
    if(hasErrors.length === 0 || opt.get('draft') === true){
      // Update the opportunity
      this.set('serverErrors',[]);
      // let errs = this.get('serverErrors');
      // let myRouting = this.get('routing');
      if (opt.get('hasDirtyAttributes')) {
        /*the record is no longer new at this point and copying and closing the
        detail view are allowed */
        opt.set('newRecord', false);

        /* If the userId is an object, that means someone selected
         * a new User and it's been hacked/copied over to the userId
         * temporarily so we need to process this */
        if(typeof(opt.get('userId')) === "object") {
          opt.set('user', opt.get('userId'));
          opt.set('userId', opt.get('user.id'));
        }

        this.sendAction('onOptSave', opt);
      }
    }
  }
});
