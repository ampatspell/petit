import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { htmlSafe } from '@ember/template';
import { action } from "@ember/object";

export default class BlockProjectTimelineSpriteIndexComponent extends Component {

  @reads('args.node.group') sprite;
  @reads('sprite.height') height;

  maxHeight = 64;
  pixel = 2;

  get style() {
    let { height, pixel, maxHeight } = this;
    if(!height) {
      return null;
    }
    let padding = 2;
    let px = Math.min(height * pixel, maxHeight) + (padding * 2) + 1;
    return htmlSafe(`height: ${px}px`);
  }

  @action
  select(frame) {
    this.sprite.select(frame);
  }

}
