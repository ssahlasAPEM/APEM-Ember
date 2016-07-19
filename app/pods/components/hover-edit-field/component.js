import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['hover-edit-field'],
  classNameBindings: ['isInvalid'],
  enabled: true,
  elementId: null,

  isValidatable: Ember.computed('', function() {
    return typeof this.get('value') === 'undefined' && this.get('model');
  }),

  inputId: Ember.computed('elementId', function() {
    return `${this.get('elementId')}-tag-input`;
  }),

  calcLinesOfText() {
    let $el = Ember.$(this.get('element')).find(`#${this.get('inputId')}`);

    let height = $el.height();
    let lineHeight = $el.css('line-height');
    lineHeight = parseFloat(lineHeight);
    let rows = height / lineHeight;
    this.set('linesOfText', Math.round(rows));
  },

  didInsertElement(){
    this.set('elementId', Ember.$(this.get('element')).attr('id'));
  },

  useTextarea: Ember.computed('linesOfText', function() {
    return this.get('linesOfText') > 1;
  }),

  isInvalid: Ember.computed('fieldValue', function() {
    return this.get(`model.validations.attrs.${this.get('property')}.isInvalid`);
  }),

  fieldValue: Ember.computed('value', 'model', 'property', {
    get() {
      if (this.get('isValidatable')) {
        return this.get('model').get(this.get('property'));
      } else {
        return this.get('value');
      }
    },
    set(key, value) {
      if (this.get('isValidatable')) {
        return this.get('model').set(this.get('property'), value);
      } else {
        return this.set('value', value);
      }
    }
  }),

  actions: {
    textClick() {
      this.calcLinesOfText();
    },

    fieldFocusedIn() {
      this.calcLinesOfText();
    }
  }
});
