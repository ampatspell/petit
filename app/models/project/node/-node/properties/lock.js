import { reads, or } from "macro-decorators";

class Lock {

  constructor(node) {
    this.node = node;
  }

  @reads('node.doc.data.locked') _locked;
  @reads('node.parent.lock.locked') _parent;
  @reads('node.nodes.locked') _nodes;

  @or('_locked', '_parent', '_nodes') locked;
  @or('_parent', '_nodes') parent;
  @reads('_locked') self;

  toggle() {
    this.node.update({ locked: !this._locked });
  }

}

export const lock = node => {
  node.lock = new Lock(node);
}
