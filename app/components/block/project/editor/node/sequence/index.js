import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";

export default class BlockProjectEditorNodeSequenceIndexComponent extends Component {

  @reads('args.node') sequence;
  @reads('sequence.sprite.model') sprite;

  // TODO: make frames reusable
  @cached
  get frames() {
    return this.sequence.frames.all.map(frame => frame.frame);
  }

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
