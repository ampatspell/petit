import { reads } from "macro-decorators";

class Expand {

  constructor(node) {
    this.node = node;
  }

  @reads('node.doc.data.expanded') expanded;
  @reads('node.hasChildren') expandable;

  update(expanded) {
    this.node.update({ expanded });
  }

  toggle() {
    this.update(!this.expanded);
  }

  expand() {
    this.update(true);
  }

  maybe() {
    let { expanded, expandable } = this;
    if(expanded || !expandable) {
      return;
    }
    this.expand();
  }

  maybeToggle() {
    let { expanded, expandable } = this;
    if(!expandable) {
      return;
    }
    this.update(!expanded);
  }

}

export const expand = node => {
  node.expand = new Expand(node);
}
