import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectEditorNodePaletteComponent extends Component {

  @action
  select(color, e) {
    e.stopPropagation();
    this.args.node.select(color);
  }

}
