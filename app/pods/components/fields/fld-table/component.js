import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['fld-table'],
  model: null,

  actions:{
    onVisibleChange:function(record){
      //  if visible is unchecked, required is unchecked and disabled
      if(record.get('visible')===true){
        record.set('visible',false);
        record.set('required',false);
      }else {
        record.set('visible',true);
      }
      record.save();
    },

    onRequiredChange:function(record){
      if(record.get('required')===true){
        record.set('required',false);
      }else {
        record.set('required',true);
      }
      record.save();
    }
  }
});
