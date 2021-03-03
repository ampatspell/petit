import Base from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSpriteComponent extends Base {

  @action
  bindKeys(keys) {
    keys.add('left', () => this.node.selectPrev());
    keys.add('right', () => this.node.selectNext());
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
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].forEach(n => {
      keys.add(`${n}`, () => {
        let color = this.node.palette.model?.colors[n - 1];
        if(color) {
          this.node.color = color;
        }
      });
    });
    [ 1, 2, 4, 8 ].forEach((pixel, idx) => {
      keys.add(`alt + ${idx+1}`, () => {
        this.node.update({ pixel });
      });
    });
    keys.add('space', e => {
      e.preventRepeat();
      this.node.tools.selectByType('project:drag');
    }, () => {
      this.node.tools.reset();
    });
  }

  @action
  selectColor(color) {
    this.args.node.color = color;
  }

}
