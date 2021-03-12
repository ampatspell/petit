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
      this.didSelect(selected, node, expandParents);
    }
  }

  didSelectNotifyDelegate(node) {
    let identifier = null;
    if(node) {
      let id = node.id;
      if(id) {
        identifier = id;
      } else {
        identifier = `${node.parent.id}/${node.index}`;
      }
    }
    this.nodes.delegate.didSelectNodeWithId(identifier);
  }

  didSelect(selected, node, expandParents) {
    node?.didSelect && node.didSelect();
    selected?.didDeselect && selected.didDeselect(node);
    this.didSelectNotifyDelegate(node);
    if(node && expandParents) {
      this.maybeExpandNodeParents(node);
    }
  }

  maybeSelectInitial(identifier) {
    if(identifier) {
      let [ id, index ] = identifier.split('/');
      if(!id) {
        id = identifier;
      }
      let node = this.nodes.all.find(node => node.id === id);
      if(node) {
        if(index) {
          let child = node.children[index];
          if(child) {
            this.select(child, { expandParents: true });
            return;
          }
        }
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
