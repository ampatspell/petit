import Base, { handler } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsProjectComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('space', handler(e => {
      e.preventRepeat();
      this.node.tools.selectByType('project:drag');
    }), handler(() => {
      this.node.tools.reset();
    }));
    keys.add('esc', handler(() => this.node.tools.reset()));
    [ 1, 2, 3, 5, 10 ].forEach((pixel, idx) => {
      keys.add(`alt + ${idx+1}`, handler(() => {
        this.node.update({ pixel });
      }));
    });
  }

}
