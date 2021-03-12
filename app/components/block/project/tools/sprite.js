import Base, { handler } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSpriteComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('c', handler(() => this.node.editor.actions.center()));
    keys.add('left', handler(() => this.node.selection.prev()));
    keys.add('right', handler(() => this.node.selection.next()));
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
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].forEach(n => {
      keys.add(`${n}`, handler(() => {
        let color = this.node.palette.model?.colors[n - 1];
        if(color) {
          this.node.color = color;
        }
      }));
    });
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

  @action
  selectColor(color) {
    this.args.node.color = color;
  }

}
