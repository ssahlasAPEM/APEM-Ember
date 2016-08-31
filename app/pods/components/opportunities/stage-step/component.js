import Ember from 'ember';

export default Ember.Component.extend({
  stageSteps:[],
  //current opportunity
  opt:null,
  quoteEvent:null,
  sampleEvent:null,
  approvalEvent:null,
  productionEvent:null,

  didRender(){
    this._super(...arguments);
    console.log('OPT DETAIL RENDER');
    this.markSteps();
  },

  actions:{
    updateQuoteStageDate(event, date){
      let formattedDate = window.moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY'),
      opp = this.get('opt');
      this.get('quoteEvent').set('date',formattedDate);
      opp.get('events').then((events) => {
        events.forEach((evt) => {
          if(evt.get('type') === event.get('type')) {
            evt.set('date',formattedDate);
          }
        });
      });
      // let myTargetEvt = optEvtArray.get(event);
      debugger;
    },
    onStepClick:function(value){
      this.opt.set('stage', value);
      this.markSteps();
    }
  },

  markSteps:function(){
    let selectedStepId = this.stageSteps.findBy('label',this.opt.get('stage')).id;
    let sSteps = this.stageSteps;
    // debugger;
    sSteps.forEach((item) => {
      // console.log(`${item}`);
      if(item.id === selectedStepId){
        // show step as active
        Ember.$('.'+item.label+'.step').addClass('active');
        Ember.$('.'+item.label+'-step-icn').addClass('hide-me');
      } else if(item.id < selectedStepId){
        Ember.$('.'+item.label+'-step-icn').removeClass('hide-me');
        Ember.$('.'+item.label+'.step').removeClass('active');
        // show step as checked
        // Ember.$('.'+item.label+'-step')
      }else{
        Ember.$('.'+item.label+'-step-icn').addClass('hide-me');
        Ember.$('.'+item.label+'.step').removeClass('active');
      }
    });
  }
});
