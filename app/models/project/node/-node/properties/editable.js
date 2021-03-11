import { reads, or, not } from "macro-decorators";

class Editable {

  @reads('node.nodes.isBusy') isBusy;

  constructor(node) {
    this.node = node;
  }

  get isLocked() {
    let { node, node: { lock } } = this;
    if(lock) {
      return lock.locked;
    } else {
      return node.parent.editable.isLocked;
    }
  }

  @or('isBusy', 'isLocked') disabled;
  @not('disabled') enabled;

}

export const editable = node => {
  node.editable = new Editable(node);
}
