import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectInspectorContentFrameInputComponent extends Component {

  @reads('args.model.editable.disabled') disabled;

  get frame() {
    let { args: { model, key } } = this;
    return model[key];
  }

  @action
  onChange(frame) {
    let { args: { model, key }, disabled } = this;
    if(disabled) {
      return;
    }
    model.update({ [key]: frame });
  }

}
