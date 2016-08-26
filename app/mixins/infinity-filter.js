import Ember from 'ember';
import InfinityRoute from 'ember-infinity/mixins/route';


export default Ember.Mixin.create(InfinityRoute, {

  filterProperty: 'modelFilter',
  filterModelProperty: 'listTitle',

  infinityFilterModel(modeltype) {
    return this.infinityModel(modeltype, { perPage: 25, startingPage: 1 }, { name: this.get('filterProperty') });
  },

  addInfinityModel(newObject) {
    this.get('controller.model').unshiftObject(newObject._internalModel);
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('filteredModel', model);
    controller.set('filterLoading', false);

    controller.addObserver('model', () => {
      this.updateFilter();
    });

    controller.addInfinityModel = (newObject) => {
      this.addInfinityModel(newObject);
    };

    this.addObserver(`controller.${this.get('filterProperty')}`, () => {
      // Immediately Filter existing list of items
      this.updateFilter();

      // Fetch additional items from server with filter query
      Ember.run.debounce(this, this.updateSearch, 300);
    });
  },

  updateSearch() {
    this.set(this.get('filterProperty'), this.get(`controller.${this.get('filterProperty')}`));
    this.refresh();
  },

  updateFilter() {
    this.set('controller.filterLoading', true);

    let rx = new RegExp(this.get(`controller.${this.get('filterProperty')}`), 'gi');
    let model = this.get('controller.model');
    let filterProperty = this.get('filterModelProperty');

    this.set('controller.filteredModel', model.filter((item) => {
      if (item.get(filterProperty) === undefined) {
        return true;
      }
      return item.get(filterProperty).match(rx) || this.get('controller.modelFilter') === '';
    }));
  },

  actions: {
    loading() {
      if (this.get('controller.filterLoading')) {
        return false;
      }

      return true;
    }
  }
});
