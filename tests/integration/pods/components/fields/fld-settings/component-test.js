import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fields/fld-settings', 'Integration | Component | fields/fld settings', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{fields/fld-settings}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#fields/fld-settings}}
      template block text
    {{/fields/fld-settings}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
