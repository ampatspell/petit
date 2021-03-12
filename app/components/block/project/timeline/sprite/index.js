import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectTimelineSpriteIndexComponent extends Component {

  @reads('args.node.group') sprite;

  @action
  onSelect(frame) {
    this.sprite.select(frame);
  }

}
