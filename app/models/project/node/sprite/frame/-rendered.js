import { cached } from "tracked-toolbox";
import { reads } from "macro-decorators";

class Rendered {

  constructor(node) {
    this.node = node;
  }

  @reads('node.width') width;
  @reads('node.height') height;
  @reads('node.bytes') bytes;
  @reads('node.colors.canvas') colors;

  @cached
  get canvas() {
    let { width, height } = this;
    if(!width || !height) {
      return null;
    }

    let canvas = document.createElement('canvas');
    canvas.style.imageRendering = 'pixelated';
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  @cached
  get content() {
    let { canvas, width, height, bytes, colors } = this;
    if(!canvas || !bytes || !colors) {
      return null;
    }

    let ctx = canvas.getContext('2d');
    let image = ctx.createImageData(width, height);
    let { data } = image;

    bytes.forEach((byte, idx) => {
      let color = colors(byte);
      if(color) {
        let { r, g, b, a } = color;
        let i = idx * 4;
        data[i + 0] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
      }
    });

    ctx.putImageData(image, 0, 0);
    return canvas;
  }

  @cached
  get url() {
    return this.content?.toDataURL();
  }


}

export const rendered = node => {
  node.rendered = new Rendered(node);
}
