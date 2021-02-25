import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectNodePaletteComponent extends Component {

  @action
  select(color, e) {
    e.stopPropagation();
    this.args.node.select(color);
  }

}
