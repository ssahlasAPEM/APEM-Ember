import Ember from 'ember';

export default Ember.Component.extend({

  searchedStatus:'Backburner',//default
  searchedState:'Open',
  actions:{
    onSearchClick:function(){
      //todo write search quesry here ?
    }
  }
});

// import layout from '../templates/components/infinity-loader';
// import infinityLoader from 'ember-infinity/components/infinity-loader';
//
// export default infinityLoader.extend({
//   layout: layout
// });
