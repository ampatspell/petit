import Component from '@glimmer/component';
import { action } from "@ember/object";
import { htmlSafe } from '@ember/template';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodePaletteComponent extends Component {

  @reads('args.node.pixel.absolute') pixel;

  @action
  select(color, e) {
    e.stopPropagation();
    this.args.node.select(color);
  }

  get style() {
    let { pixel } = this;
    let size = (pixel * 8) + 1;
    let width = (8 * size) + 1;
    return htmlSafe(`max-width: ${width}px`);
  }

}
