import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSpriteFramesIndexComponent extends Component {

  @reads('args.node') frames;
  @reads('frames.frame') frame;
  @reads('frame.palette.model') palette;
  @reads('frames.editing') editing;
  @reads('frames.color.index') color;

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
    this.frames.editing = true;
  }

}
