import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentColorsComponent extends Component {

  get colors() {
    return this.args.model[this.args.key];
  }

  @action
  selectColor(model, color) {
    this.colors.replaceColor(model.value, color);
  }

}
