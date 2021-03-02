class NodesTools {

  constructor(nodes) {
    this.nodes = nodes;
  }

  get selected() {
    return this.nodes.selection.selected.group.tools.selected;
  }

}

export const tools = nodes => {
  nodes.tools = new NodesTools(nodes);
}
