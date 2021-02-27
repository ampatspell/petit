import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentActionsCheckboxComponent extends Component {

  @action
  onToggle() {
    let { model, key } = this.args;
    let value = model[key];
    model.update({ [key]: !value });
  }

}
