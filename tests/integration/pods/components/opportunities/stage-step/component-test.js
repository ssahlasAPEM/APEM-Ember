import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('opportunities/stage-step', 'Integration | Component | opportunities/stage step', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{opportunities/stage-step}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#opportunities/stage-step}}
      template block text
    {{/opportunities/stage-step}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
