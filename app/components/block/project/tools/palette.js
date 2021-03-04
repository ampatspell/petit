import Base, { handler } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsPaletteComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('space', handler(e => {
      e.preventRepeat();
      this.node.tools.selectByType('project:drag');
    }), handler(() => {
      this.node.tools.reset();
    }));
  }

}
