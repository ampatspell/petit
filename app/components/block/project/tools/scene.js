import Base from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSceneComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('e', () => this.tools.selectByType('edit'));
    keys.add('r', () => this.tools.selectByType('resize'));
    keys.add('esc', () => {
      let { node, tools, tool } = this;
      if(tool.type === 'idle') {
        node.nodes.select(node);
      } else {
        tools.reset();
      }
    });
    [ 1, 2, 4, 8 ].forEach((pixel, idx) => {
      keys.add(`alt + ${idx+1}`, () => {
        this.node.update({ pixel });
      });
    });
    keys.add('space', e => {
      e.preventRepeat();
      this.node.tools.selectByType('drag');
    }, () => {
      this.node.tools.reset();
    });
  }

}
