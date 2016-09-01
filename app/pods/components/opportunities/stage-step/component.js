import Ember from 'ember';

export default Ember.Component.extend({
  store:Ember.inject.service(),
  stageSteps:[],
  //current opportunity
  opt:null,
  quoteEvent:null,
  sampleEvent:null,
  approvalEvent:null,
  productionEvent:null,


  didReceiveAttrs() {
    this._super(...arguments);
    for(var i=0, attrLen = arguments.length;i<attrLen; i++){
      let newAttrs = arguments[i].newAttrs;
      if(newAttrs){
        if(newAttrs.opt.value.get('newRecord')){
          /* set all events to null because this is a new record.*/
          this.set('quoteEvent', null);
          this.set('sampleEvent', null);
          this.set('approvalEvent', null);
          this.set('productionEvent', null);
        }
      }
    }
  },

  /* A basic to every component click action handler which allows us to recognise
   click event targets. We need thi because the semantic step ui triggers a click
   without regard to wether a child element is clicked or a step ui element is clicked.
   We need to know when the user clicks on the datepicker and when the user just changes
   the opt's stage attribute.*/
  click:function(event){
    let targetAttr = event.target.attributes;
    for(var i=0, attLen=targetAttr.length;i<attLen;i++){
      if(targetAttr[i].nodeValue === 'quote' ||
          targetAttr[i].nodeValue === 'sample' ||
          targetAttr[i].nodeValue === 'approval' ||
          targetAttr[i].nodeValue === 'production'){
          this.onStepClick(targetAttr[i].nodeValue);
      }
    }
  },

  didRender(){
    this._super(...arguments);
    console.log('OPT DETAIL RENDER');
    this.markSteps();
  },
  /* Called by the click action handler. */
  onStepClick:function(value){

    this.opt.set('stage', value);

    this.markSteps();

    let sSteps = this.stageSteps;

    let eventedStepId = sSteps.findBy('label',this.opt.get('stage')).id-1;
    sSteps.forEach((item) => {
      let me=this;
      let eventName = item.label+'Event';
      let today = window.moment(Date().toString(), 'ddd MMM DD YYYY HH:mm:ss Z').format('MM-DD-YYYY');
      let myEvt = this.get(eventName);
      // console.log(`${item}`);
      if(item.id === eventedStepId){
        //Remark Aug 31st Ralica M.: using the stageSteps hardcoded array,
        //we find the current step's type by looking at the label and get the
        //appropriate stage attribute from the component to asign today's date.
        if(!myEvt){
          myEvt = this.get('store').createRecord('event', {
            date: today,
            type: item.label,
            opportunity:this.opt
          });
          myEvt.save().then(function(data){
            me.set(eventName, data);
          });
        }
      } else if(item.id < eventedStepId){
        if(!myEvt){
          myEvt = this.get('store').createRecord('event', {
            date: today,
            type: item.label,
            opportunity:this.opt
          });
          myEvt.save().then(function(data){
            me.set(eventName, data);
          });
        }
      } else if(value === 'production' && item.id === eventedStepId+1){
        // If this is the last stage, we also want to set the date on this stage
        if(!myEvt){
          myEvt = this.get('store').createRecord('event', {
            date: today,
            type: item.label,
            opportunity:this.opt
          });
          myEvt.save().then(function(data){
            me.set(eventName, data);
          });
        }
      }else{
        //delete anything before the clicked date
        if(myEvt){
          this.deleteUncheckedEvents(myEvt);//myEvt.destroyRecord();
        }
      }
    });
  },

  /* Triggered when there are leftover events in the opt which will not be used
  after the current user change to the stage step component.*/
  deleteUncheckedEvents:function(event){
    let eventName = event.get('type')+'Event';
    this.set(eventName, null);
    event.destroyRecord();
  },

  /* A method used to manage css styles of the stage step UI*/
  markSteps:function(){
    let selectedStepId = this.stageSteps.findBy('label',this.opt.get('stage')).id;
    let sSteps = this.stageSteps;

    sSteps.forEach((item) => {
      // console.log(`${item}`);
      if(item.id === selectedStepId){
        // show step as active
        Ember.$('.'+item.label+'.step').addClass('active');
        Ember.$('.'+item.label+'-step-icn').addClass('hide-me');
      } else if(item.id < selectedStepId){
        Ember.$('.'+item.label+'-step-icn').removeClass('hide-me');
        Ember.$('.'+item.label+'.step').removeClass('active');
      }else{
        Ember.$('.'+item.label+'-step-icn').addClass('hide-me');
        Ember.$('.'+item.label+'.step').removeClass('active');
      }
    });
  },

  actions:{
    updateStageDate(event, date){
      let formattedDate = window.moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');
      event.set('date',formattedDate);
      event.save();
    }
  }
});
