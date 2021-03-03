import { reads } from "macro-decorators";

const pos = (_target, key) => {
  return {
    get() {
      return this.pixel * this.doc.data[key];
    }
  }
}

const xy = [ 'x', 'y' ];

class EditorProperties {

  @reads('node.doc') doc;
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
    this.node.update(props);
  }

}

export const editor = node => {
  node.editor = new EditorProperties(node);
}
