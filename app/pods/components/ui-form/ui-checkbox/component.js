import Ember from 'ember';

export default Ember.Component.extend({
    attributeBindings: ['type', 'value', 'checked', 'disabled'],
    tagName: 'input',
    type: 'checkbox',
    checked: false,
    disabled: false,

    actions: {

        /*isCheckedBool: function(key, value){
            var model = this.get('model');

            if (value === undefined) {
                // property being used as a getter
                return model.get('isChecked') > 0;
            } else {
                // property being used as  setter
                model.set('isChecked', value == true ? 1 : 0);
                model.save();
                return model;
            }
        }.property('model.isChecked') })*/
    }
});
