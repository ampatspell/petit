import Component from '@glimmer/component';
import { reads, equal } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectEditorNodeSpriteIndexComponent extends Component {

  @reads('args.node') sprite;
  @reads('sprite.colors') colors;
  @reads('sprite.color.index') color;
  @reads('sprite.frame') frame;

  @equal('sprite.tools.selected.type', 'edit') editing;
  @equal('sprite.tools.selected.type', 'resize') resizing;

  get size() {
    let { width, height, pixel: { absolute: pixel } } = this.frame;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

  @action
  onResize(frame) {
    this.sprite.resize(frame);
  }

}
