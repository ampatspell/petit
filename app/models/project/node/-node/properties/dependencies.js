import { cached } from "tracked-toolbox";

class Dependencies {

  constructor(node, opts) {
    this.node = node;
    this.opts = opts;
  }

  @cached
  get inverses() {
    let { node } = this;
    if(!node.identifier) {
      return null;
    }
    return node.nodes.all.filter(another => another.dependencies?.all.includes(node));
  }

  @cached
  get _all() {
    let { node } = this;
    return node.referenceKeys.map(key => node[key]?.model);
  }

  @cached
  get _references() {
    let { opts: { references } } = this;
    return (references && references()) || [];
  }

  @cached
  get all() {
    let { _all, _references } = this;
    return [ ..._all, ..._references ].filter(Boolean);
  }

}

export const dependencies = (node, references) => {
  node.dependencies = new Dependencies(node, { references });
}
