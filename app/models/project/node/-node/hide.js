import { reads, or } from "macro-decorators";

class Hide {

  constructor(node) {
    this.node = node;
  }

  @reads('node.doc.data.hidden') _hidden;

  @reads('node.parent.hide.hidden') parent;
  @or('_hidden', 'parent') hidden;
  @reads('_hidden') self;

  toggle() {
    this.node.update({ hidden: !this._hidden });
  }

}

export const hide = node => {
  node.hide = new Hide(node);
}
