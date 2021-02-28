import { reads } from "macro-decorators";

const {
  assign
} = Object;

const pos = (_target, key) => {
  return {
    get() {
      return this.pixel * this.data[key];
    }
  }
}

const xy = [ 'x', 'y' ];

class EditorProperties {

  @reads('node.doc.data.editor') data;
  @reads('node.nodes.pixel', 1) pixel;

  @pos x;
  @pos y;

  constructor(node) {
    this.node = node;
  }

  translate(props) {
    let { pixel } = this;
    let hash = {};
    xy.forEach(key => {
      let value = props[key];
      if(value !== undefined) {
        hash[key] = Math.round(value / pixel);
      }
    });
    return hash;
  }

  update(props) {
    props = this.translate(props);
    assign(this.data, props);
    this.node._scheduleSave.schedule();
  }

}

export const editor = node => {
  node.editor = new EditorProperties(node);
}
