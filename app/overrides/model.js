import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.reopen({
  simpleClone: function () {
    let model = this,
        attrs = model.toJSON(),
        class_type = model.constructor;

    let objectType = Ember.String.decamelize(class_type.toString().split(':')[1]);

    this.eachRelationship(function (key, rel) {
      if (rel.kind === 'belongsTo') {
        attrs[key] = model.get(key);
      }
    });

    delete attrs.id;

    return { objectType, attrs };
  }
});
