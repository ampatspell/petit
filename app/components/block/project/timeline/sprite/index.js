import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { htmlSafe } from '@ember/template';
import { action } from "@ember/object";

export default class BlockProjectTimelineSpriteIndexComponent extends Component {

  @reads('args.node.group') sprite;
  @reads('sprite.height') height;

  pixel = 2;

  get style() {
    let { height, pixel } = this;
    if(!height) {
      return null;
    }
    let px = height * pixel + 5;
    return htmlSafe(`height: ${px}px`);
  }

  @action
  select(frame) {
    this.sprite.select(frame);
  }

}
