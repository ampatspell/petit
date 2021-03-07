import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentColorComponent extends Component {

  get paletteReference() {
    let { model, palette } = this.args;
    return model[palette];
  }

  @reads('paletteReference.model') palette;

  get colorReference() {
    let { model, key } = this.args;
    return model[key];
  }

  @reads('colorReference.model') color;

  @action
  onSelect(color) {
    let { model, key } = this.args;
    model[key] = color;
  }

}
