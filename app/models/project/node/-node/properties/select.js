import { firstObject, lastObject, prevObject, nextObject } from 'petit/util/array';

class Select {

  constructor(node) {
    this.node = node;
  }

  _select({initial, next}) {
    let { node, node: { children, nodes, nodes: { selected } } } = this;
    if(selected === node) {
      let model = initial(children);
      if(model) {
        nodes.select(model);
      }
    } else if(selected.hasParent(node)) {
      let model = next(children, selected);
      if(model) {
        nodes.select(model);
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

export const select = node => {
  node.select = new Select(node);
}
