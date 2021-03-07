
class Colors {

  constructor(node, opts) {
    this.node = node;
    this.opts = opts;
  }

  get palette() {
    return this.node[this.opts.palette]?.model;
  }

  get data() {
    return this.node.doc.data[this.opts.key] || [];
  }

}

export const colors = (node, opts) => {
  node.colors = new Colors(node, opts);
}
