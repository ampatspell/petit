import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodePaletteComponent extends Component {

  @action
  addColor() {
    this.args.model.createNewColor();
  }

}
