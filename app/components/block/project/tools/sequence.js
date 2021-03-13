import Base, { handler } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSequenceComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('left', handler(() => this.node.selection.prev()));
    keys.add('right', handler(() => this.node.selection.next()));
    keys.add('c', handler(() => this.node.editor.actions.center()));
    keys.add('esc', handler(() => {
      let { node, tools, tool } = this;
      if(tool.type === 'idle') {
        node.nodes.select(node);
      } else {
        tools.reset();
      }
    }));
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
