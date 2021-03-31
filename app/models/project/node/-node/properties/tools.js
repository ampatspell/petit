class Tools {

  constructor(node, tools) {
    this.node = node;
    this.all = tools || [];
    if(!this.findWith('type', 'project:drag')) {
      this.all.push({ type: 'project:drag', hidden: true });
    }
  }

  get selected() {
    return this.node.nodes.tools.selected(this.node) || this.all[0];
  }

  select(tool) {
    this.node.nodes.tools.select(this.node, tool);
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
