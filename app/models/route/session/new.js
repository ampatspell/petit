import Model from '../../-model';
import { action } from "@ember/object"
import { inject as service } from "@ember/service"

export default class SessionNew extends Model {

  @service store;
  @service router;

  @action
  async perform() {
    try {
      await this.store.auth.methods.popup.google.signIn();
    } catch(err) {
      console.error(err.stack);
      return;
    }
    this.router.transitionTo('index');
  }

}
