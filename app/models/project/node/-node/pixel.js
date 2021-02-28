import { reads } from "macro-decorators";

class Pixel {

  constructor(node) {
    this.node = node;
  }

  @reads('node.nodes.pixel') nodes;
  @reads('node.doc.data.pixel', 1) value;

  get absolute() {
    return this.nodes * this.value;
  }

  update(pixel) {
    this.node.update({ pixel });
  }

}

export const pixel = node => {
  node.pixel = new Pixel(node);
}
