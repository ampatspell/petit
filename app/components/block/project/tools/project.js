import Base, { handler, pixel, drag } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsProjectComponent extends Base {

  @action
  bindKeys(keys) {
    drag(this, keys);
    pixel(this, keys, [ 1, 2, 3, 5, 10 ]);
    keys.add('esc', handler(() => this.node.tools.reset()));
  }

}
