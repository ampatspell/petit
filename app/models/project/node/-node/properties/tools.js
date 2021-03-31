import { tracked } from "@glimmer/tracking";
import { reads } from "macro-decorators";

class Tools {

  @tracked _tool;

  @reads('node.nodes.selection.selected.group') _group;

  constructor(node, tools) {
    this.node = node;
    this.all = tools || [];
    if(!this.findWith('type', 'project:drag')) {
      this.all.push({ type: 'project:drag', hidden: true });
    }
  }

  get default() {
    return this.all[0];
  }

  get tool() {
    return this._tool || this.default;
  }

  get selected() {
    if(this._group === this.node) {
      return this.tool;
    }
    return this.default;
  }

  select(tool) {
    this._tool = tool;
  }

  reset() {
    this.select(null);
  }

  findWith(key, value) {
    return this.all.find(tool => tool[key] === value)
  }

  selectWith(key, value) {
    this.select(this.findWith(key, value));
  }

  selectByType(type) {
    this.selectWith('type', type);
  }

}

let mapping = {
  'idle': { icon: 'mouse-pointer', type: 'idle' },
  'edit': { icon: 'pen', type: 'edit' },
  'resize': { icon: 'expand', type: 'resize', overlaysHidden: true },
  'center': { icon: 'map-marker-alt', type: 'center' }
};

export const tools = tools => node => {
  tools = tools.map(tool => {
    if(typeof tool === 'string') {
      tool = Object.assign(mapping[tool]);
    }
    return tool;
  });
  node.tools = new Tools(node, tools);
}
