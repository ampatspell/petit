import { tracked } from "@glimmer/tracking";

class Tools {

  @tracked _selected;

  constructor(node, tools) {
    this.node = node;
    this.all = tools || [];
    if(!this.findWith('type', 'project:drag')) {
      this.all.push({ type: 'project:drag', hidden: true });
    }
  }

  get _default() {
    return this.all[0];
  }

  //

  select(tool) {
    this._selected = tool;
  }

  reset() {
    this._selected = null;
  }

  get selected() {
    return this._selected || this._default;
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
