import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentActionsCheckboxComponent extends Component {

  @action
  onToggle() {
    console.log('toggle');
    let { model, key } = this.args;
    let value = model[key];
    model.update({ [key]: !value });
  }

  @action
  onChange(value) {
    console.log('change');
    let { model, key } = this.args;
    model.update({ [key]: value });
  }

}
