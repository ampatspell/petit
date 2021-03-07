import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentColorComponent extends Component {

  get reference() {
    let { model, key } = this.args;
    return model[key];
  }

  @reads('reference.model') color;

  @action
  onChange(value) {
    let { model, key } = this.args;
    let color = this.reference.palette?.identifiedColors.find(({ identifier }) => identifier === value) || null;
    model[key] = color;
  }

  @action
  onSelect(color) {
    let { model, key } = this.args;
    model[key] = color;
  }

  @action
  onFollow() {
    let model = this.reference?.palette;
    if(model) {
      model.select(this.color);
      model.nodes.select(model);
    }
  }

}
