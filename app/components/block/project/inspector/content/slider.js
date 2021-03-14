import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentSliderComponent extends Component {

  @reads('args.min') min;
  @reads('args.max') max;
  @reads('args.model.editable.disabled') disabled;

  get value() {
    let { args: { model, key } } = this;
    return model[key];
  }

  @action
  onInput(value) {
    let { args: { model, key }, min, max } = this;
    value = Math.max(Math.min(value, max), min);
    model.update({ [key]: value });
  }

}
