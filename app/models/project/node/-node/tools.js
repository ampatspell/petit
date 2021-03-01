class Tools {

  constructor(node, tools) {
    this.node = node;
    this.all = tools;
  }

  select(tool) {
    this.node.nodes.tools.select(this.node, tool || null);
  }

  get selected() {
    return this.node.nodes.tools.selected(this.node) || this.all[0];
  }

  selectWith(key, value) {
    this.select(this.all.find(tool => tool[key] === value));
  }

  selectByType(type) {
    this.selectWith('type', type);
  }

}

export const tools = (node, tools) => {
  node.tools = new Tools(node, tools);
}
