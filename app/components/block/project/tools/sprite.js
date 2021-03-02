import Base from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSpriteComponent extends Base {

  @action
  selectColor(color) {
    this.args.node.color = color;
  }

}
