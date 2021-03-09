import Base, { handler } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSequenceComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('c', handler(() => this.node.editor.actions.center()));
    [ 1, 2, 4, 8 ].forEach((pixel, idx) => {
      keys.add(`alt + ${idx+1}`, handler(() => {
        this.node.update({ pixel });
      }));
    });
    keys.add('space', handler(e => {
      e.preventRepeat();
      this.node.tools.selectByType('project:drag');
    }), handler(() => {
      this.node.tools.reset();
    }));
  }

}
