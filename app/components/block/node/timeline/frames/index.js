import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { reads } from "macro-decorators";

export default class BlockNodeTimelineFramesIndexComponent extends Component {

  @reads('args.sprite.height') height;

  pixel = 2;
  maxHeight = 64;

  get style() {
    let { height, pixel, maxHeight } = this;
    if(!height) {
      return null;
    }
    let padding = 2;
    let px = Math.min(height * pixel, maxHeight) + (padding * 2) + 1;
    return htmlSafe(`height: ${px}px`);
  }

}
