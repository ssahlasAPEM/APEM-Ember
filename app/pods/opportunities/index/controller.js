import Ember from 'ember';

export default Ember.Controller.extend({

  defaultView:'list',

  actions:{
    showGridView:function(){
      console.log('grid view');
      this.set('defaultView','grid');
    },
    showListView:function(){
      console.log('list view');
      this.set('defaultView','list');
    }
  }
});
