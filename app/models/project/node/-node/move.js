import { sortedBy, prevObject, nextObject } from 'petit/util/array';
import { reads } from "macro-decorators";

class Move {

  constructor(node) {
    this.node = node;
  }

  @reads('node.parentChildren') parentChildren;

  reorderParentChildren() {
    sortedBy(this.parentChildren, 'index').forEach((model, index) => model.update({ index }));
  }

  swap(another) {
    if(!another) {
      return;
    }
    let { node } = this;
    let index = node.index;
    node.update({ index: another.index });
    another.update({ index: index });
    this.reorderParentChildren();
    node.didMove && node.didMove();
  }

  up() {
    this.swap(prevObject(this.parentChildren, this.node));
  }

  down() {
    this.swap(nextObject(this.parentChildren, this.node));
  }

}

export const move = node => {
  node.move = new Move(node);
}
