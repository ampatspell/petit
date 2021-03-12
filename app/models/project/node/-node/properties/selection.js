import { firstObject, lastObject, prevObject, nextObject } from 'petit/util/array';

class Selection {

  constructor(node) {
    this.node = node;
  }

  select(model) {
    let { node } = this;
    if(node.select) {
      node.select(model);
    } else {
      node.nodes.select(model);
    }
  }

  _select({initial, next}) {
    let { node, node: { children, nodes: { selected } } } = this;
    if(selected === node) {
      let model = initial(children);
      if(model) {
        this.select(model);
      }
    } else if(selected.hasParent(node)) {
      let model = next(children, selected);
      if(model) {
        this.select(model);
      }
    }
  }

  prev() {
    this._select({
      initial: children => lastObject(children),
      next: (children, selected) => prevObject(children, selected, true)
    });
  }

  next() {
    this._select({
      initial: children => firstObject(children),
      next: (children, selected) => nextObject(children, selected, true)
    });
  }

}

export const selection = node => {
  node.selection = new Selection(node);
}
