import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentColorComponent extends Component {

  get reference() {
    let { model, palette } = this.args;
    return model[palette];
  }

  @reads('reference.model') palette;

  get color() {
    let { model, key } = this.args;
    return model[key];
  }

  @action
  onSelect(color) {
    let { model, key } = this.args;
    model[key] = color;
  }

}
