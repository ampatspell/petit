import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentFrameInputComponent extends Component {

  get frame() {
    let { args: { model, key } } = this;
    return model[key];
  }

  @action
  onChange(frame) {
    let { args: { model, key } } = this;
    model.update({ [key]: frame });
  }

}
