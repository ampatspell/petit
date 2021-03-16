import Base, { handler, center, arrows, reset, pixel, drag } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSequenceComponent extends Base {

  @action
  bindKeys(keys) {
    center(this, keys);
    arrows(this, keys);
    reset(this, keys);
    pixel(this, keys);
    drag(this, keys);
    keys.add('left', handler(() => this.node.selection.prev()));
    keys.add('right', handler(() => this.node.selection.next()));
  }

}
