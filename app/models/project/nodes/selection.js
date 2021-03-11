import { tracked } from "@glimmer/tracking";

const {
  assign
} = Object;

class NodesSelection {

  constructor(nodes) {
    this.nodes = nodes;
  }

  @tracked _selected;

  get _existing() {
    let node = this._selected;
    if(node && node.exists) {
      return node;
    }
    return null;
  }

  get _default() {
    return this.nodes.delegate.defaultSelection;
  }

  get selected() {
    return this._existing || this._default;
  }

  select(node, opts) {
    let { expandParents } = assign({ expandParents: false }, opts);
    let { selected } = this;
    node = node || this._default;
    if(selected !== node) {
      this._selected = node;
      node?.didSelect && node.didSelect();
      selected?.didDeselect && selected.didDeselect(node);
      this.nodes.delegate.didSelectNode(node);
      if(node && expandParents) {
        this.maybeExpandNodeParents(node);
      }
    }
  }

  maybeSelectInitial(id) {
    if(id) {
      let node = this.nodes.all.find(node => node.id === id);
      if(node) {
        this.select(node, { expandParents: true });
      }
    }
  }

  maybeExpandNodeParents(node) {
    let curr = node.parent;
    while(curr) {
      curr.expand && curr.expand.maybe();
      curr = curr.parent;
    }
  }

}

export const selection = nodes => {
  nodes.selection = new NodesSelection(nodes);
}
