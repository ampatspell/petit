import Model from '../../-model';
import { action } from "@ember/object"
import { inject as service } from "@ember/service"

export default class SessionNew extends Model {

  @service store;
  @service router;
  @service requirements;

  @action
  async perform() {
    try {
      await this.store.auth.methods.popup.google.signIn();
    } catch(err) {
      console.error(err.stack);
      return;
    }
    if(!this.requirements.retryStoredTransition()) {
      this.router.transitionTo('index');
    }
  }

}
