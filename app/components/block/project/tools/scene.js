import Base, { handler } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSceneComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('c', handler(() => this.node.editor.actions.center()));
    keys.add('e', handler(() => this.tools.selectByType('edit')));
    keys.add('r', handler(() => this.tools.selectByType('resize')));
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
