import Base from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsProjectComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('space', e => {
      e.preventRepeat();
      this.node.tools.selectByType('drag');
    }, () => {
      this.node.tools.reset();
    });
    keys.add('esc', () => this.node.tools.reset());
    [ 1, 2, 3, 5, 10 ].forEach((pixel, idx) => {
      keys.add(`alt + ${idx+1}`, () => {
        this.node.update({ pixel });
      });
    });
  }

}
