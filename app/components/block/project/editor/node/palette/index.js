import Component from '@glimmer/component';
import { action } from "@ember/object";
import { htmlSafe } from '@ember/template';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodePaletteComponent extends Component {

  @reads('args.node.pixel.absolute') pixel;

  @action
  select(color, e) {
    e.stopPropagation();
    this.args.node.nodes.select(color);
  }

  get style() {
    let { pixel } = this;
    let color = pixel * 5;
    let row = 8 * color;
    return htmlSafe(`max-width: ${row}px`);
  }

}
