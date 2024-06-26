import Component from '@glimmer/component';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSequenceIndexComponent extends Component {

  @reads('args.node') sequence;
  @reads('sequence.sprite.model') sprite;
  @reads('sequence.frames') frames;
  @reads('sequence.framerate') framerate;

  // TODO: move to editor
  get size() {
    let { width, height, pixel: { absolute: pixel } } = this.sequence;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

}
