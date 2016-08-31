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
            type: value,
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
            type: value,
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

  deleteUncheckedEvents:function(event){
    let eventName = event.get('type')+'Event';
    this.set(eventName, null);
    event.destroyRecord();
  },

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
    },
  }
});
