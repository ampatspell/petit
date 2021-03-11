import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentInputComponent extends Component {

  @action
  onChange(value) {
    let { onChange, model, key } = this.args;
    if(onChange) {
      onChange(value);
    } else {
      model.update({ [key]: value });
    }
  }

}
