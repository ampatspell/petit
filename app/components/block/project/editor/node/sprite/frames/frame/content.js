import Shape from 'ember-cli-konva/components/konva/node/shape';
import { reads } from "macro-decorators";
import { cached } from 'tracked-toolbox';
import { Pixel, fromIndex, toIndex } from 'petit/util/pixel';

export default class BlockProjectEditorNodeSpriteFramesFrameContentComponent extends Shape {

  @reads('args.editing') editing;
  @reads('args.size') size;
  @reads('args.frame') frame;
  @reads('args.color') color;
  @reads('args.palette') palette;

  @cached
  get sceneFunc() {
    let { palette, frame: { width, height, pixel, bytes } } = this;
    let size = { width, height };
    let rgba = palette?.rgba;
    return (ctx) => {
      if(bytes && rgba) {
        bytes.forEach((byte, idx) => {
          let c = rgba(byte);
          if(!c) {
            return;
          }
          let { x, y } = fromIndex(idx, size);
          ctx.fillStyle = c;
          ctx.fillRect(x * pixel, y * pixel, pixel, pixel);
        });
      }

      if(pixel > 3) {
        let line = (x1, y1, x2, y2) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        ctx.strokeStyle = `rgba(210,210,210,0.2)`;

        let ph = size.height * pixel;
        for(let x = 1; x < size.width; x++) {
          let px = x * pixel + 0.5;
          line(px, 0, px, ph);
        }

        let pw = size.width * pixel;
        for(let y = 1; y < size.height; y++) {
          let py = y * pixel + 0.5;
          line(0, py, pw, py);
        }
      }
    };
  }

  @cached
  get hitFunc() {
    return (context, shape) => {
      let { width, height } = shape.size();
      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(shape);
    };
  }

  get nodeProperties() {
    let { sceneFunc, hitFunc, size: { width, height } } = this;
    return {
      x: 0,
      y: 0,
      width,
      height,
      sceneFunc,
      hitFunc,
      listening: true
    };
  }

  getRelativePointerPosition() {
    let { node } = this;
    let pos = node.getStage().getPointerPosition();
    let transform = node.getAbsoluteTransform().copy();
    transform.invert();
    return transform.point(pos);
  }

  pixelForRelativePointerPosition() {
    let pos = this.getRelativePointerPosition();
    let { frame: { pixel, width, height } } = this;
    let size = { width, height };
    let x = Math.floor(pos.x / pixel);
    let y = Math.floor(pos.y / pixel);
    let index = toIndex(x, y, size);
    return { x, y, index };
  }

  updatePixelForEvent() {
    let { frame } = this;
    let { index } = this.pixelForRelativePointerPosition();
    frame.setPixel(index, this.color);
  }

  didCreateNode() {
    let drawing = false;
    this.on('mousedown', e => {
      if(!this.editing) {
        return;
      }
      e.cancelBubble = true;
      drawing = true;
      this.updatePixelForEvent(e);
    });
    this.on('mouseup', e => {
      e.cancelBubble = true;
      drawing = false;
    });
    this.on('mouseleave', () => {
      drawing = false;
    });
    this.on('mousemove', e => {
      if(!drawing) {
        return;
      }
      e.cancelBubble = true;
      this.updatePixelForEvent(e);
    });
  }

}
