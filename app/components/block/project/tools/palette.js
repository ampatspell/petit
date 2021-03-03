import Base from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsPaletteComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('space', e => {
      e.preventRepeat();
      this.node.tools.selectByType('drag');
    }, () => {
      this.node.tools.reset();
    });
  }

}