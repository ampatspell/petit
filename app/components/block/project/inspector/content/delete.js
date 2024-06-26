import Component from '@glimmer/component';
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class BlockProjectInspectorContentDeleteComponent extends Component {

  @service router;
  @service dialogs;

  @action
  async onClick() {
    let { model, confirmation, label, route } = this.args;
    let confirmed = await this.dialogs.alert(confirmation, 'Cancel', label);
    if(!confirmed) {
      return;
    }
    if(route) {
      this.router.transitionTo('projects');
    }
    await model.delete();
  }

}
