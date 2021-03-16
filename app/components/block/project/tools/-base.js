import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export const handler = cb => e => {
  if(e.target.tagName === 'INPUT') {
    return;
  }
  return cb(e);
}

export const arrows = (component, keys) => {
  let delta = (dx, dy) => handler(() => {
    let { node, node: { x, y } } = component;
    node.update({ x: x + dx, y: y + dy });
  });
  keys.add('shift + up', delta(0, -1));
  keys.add('shift + down', delta(0, 1));
  keys.add('shift + left', delta(-1, 0));
  keys.add('shift + right', delta(1, 0));
}

export const center = (component, keys) => {
  keys.add('c', handler(() => component.node.editor.actions.center()));
}

export const edit = (component, keys) => {
  keys.add('e', handler(() => component.tools.selectByType('edit')));
}

export const resize = (component, keys) => {
  keys.add('r', handler(() => component.tools.selectByType('resize')));
}

export const reset = (component, keys) => {
  keys.add('esc', handler(() => {
    let { node, tools, tool } = component;
    if(tool.type === 'idle') {
      node.nodes.select(node);
    } else {
      tools.reset();
    }
  }));
}

export const pixel = (component, keys, values=[ 1, 2, 4, 8 ]) => {
  values.forEach((pixel, idx) => {
    keys.add(`alt + ${idx+1}`, handler(() => component.node.update({ pixel })));
  });
}

export const drag = (component, keys) => {
  keys.add('space', handler(e => {
    e.preventRepeat();
    component.node.tools.selectByType('project:drag');
  }), handler(() => {
    component.node.tools.reset();
  }));
}

export default class BlockProjectToolsBaseComponent extends Component {

  @reads('args.node') node;
  @reads('node.tools') tools;
  @reads('node.tools.selected') tool;

  @action
  selectTool(tool) {
    if(tool.type === 'center') {
      this.args.node.editor.actions.center();
      return;
    }
    this.args.node.tools.select(tool);
  }

}
