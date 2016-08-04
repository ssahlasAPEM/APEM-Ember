import Ember from 'ember';

export default Ember.Component.extend({
  stageSteps:[],
  //current opportunity
  opt:null,

  init(){
    this._super(...arguments);

    this.markSteps();
  },

  actions:{
    onStepClick:function(value){
      this.opt.set('stage', value);
      this.markSteps();
    }
  },

  markSteps:function(){
    var selectedStepId = this.stageSteps.findBy('label',this.opt.get('stage')).id;

    this.stageSteps.forEach(function(item){
      if(item.id === selectedStepId){
        // show step as active
        Ember.$('.'+item.label+'.step').addClass('active');
        Ember.$('.'+item.label+'-step-icn').addClass('hidden');
      } else if(item.id < selectedStepId){
        Ember.$('.'+item.label+'-step-icn').removeClass('hidden');
        Ember.$('.'+item.label+'.step').removeClass('active');
        // show step as checked
        // Ember.$('.'+item.label+'-step')
      }else{
        Ember.$('.'+item.label+'-step-icn').addClass('hidden');
        Ember.$('.'+item.label+'.step').removeClass('active');
      }
    });
  }
});
