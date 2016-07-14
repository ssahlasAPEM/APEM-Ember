import Ember from 'ember';
import CoreObjectCustomization from 'emberapp/mixins/core-object/customization';

export default Ember.Controller.extend(CoreObjectCustomization, {

    coreObjectName: 'user',

    actions: {
        deleteUser() {
            this.get('model').deleteRecord();
            this.transitionToRoute('users');
        }
    }
});
