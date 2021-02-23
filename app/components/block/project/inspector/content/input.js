import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentInputComponent extends Component {

  @action
  onChange(value) {
    let { model, key } = this.args;
    model.update({ [key]: value });
  }

}
