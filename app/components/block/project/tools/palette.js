import Base, { handler, center, reset, pixel, drag, arrows } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsPaletteComponent extends Base {

  @action
  bindKeys(keys) {
    center(this, keys);
    reset(this, keys);
    drag(this, keys);
    pixel(this, keys);
    arrows(this, keys);
    keys.add('left', handler(() => this.node.selection.prev()));
    keys.add('right', handler(() => this.node.selection.next()));
  }

}
