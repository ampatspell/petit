import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSpriteIndexComponent extends Component {

  @reads('args.node') sprite;
  @reads('sprite.frame') frame;
  @reads('frame.palette.model') palette;
  @reads('sprite.editing') editing;
  @reads('sprite.color.index') color;

  get size() {
    let { width, height, pixel } = this.frame;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

  @action
  startEditing() {
    this.sprite.editing = true;
  }

}
