import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentActionsButtonComponent extends Component {

  @service dialogs;

  @action
  async onClick() {
    let { args: { onClick, confirmation, label } } = this;
    if(confirmation) {
      let confirmed = await this.dialogs.alert(confirmation, 'Cancel', label);
      if(!confirmed) {
        return;
      }
    }
    onClick && onClick();
  }

}
