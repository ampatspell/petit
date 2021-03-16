import Shape from 'ember-cli-konva/components/konva/node/shape';
import { action } from "@ember/object";
import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";
import { unwrapReference } from 'petit/util/reference';

export default class BlockKonvaFrameComponent extends Shape {

  @reads('args.size') size;
  @reads('args.frame') frame;

  get content() {
    let { frame, args: { key } } = this;
    if(key) {
      frame = frame?.[key];
    }
    frame = unwrapReference(frame);
    return frame?.rendered?.content;
  }

  // TODO: share this with frames
  @cached
  get sceneFunc() {
    let { size } = this;
    return ctx => {
      ctx.imageSmoothingEnabled = false;
      let { content } = this;
      if(content) {
        ctx.drawImage(content, 0, 0, size.width, size.height);
      } else {
        ctx.fillStyle = 'rgba(255,0,0,0.2)';
        ctx.fillRect(0, 0, size.width, size.height);
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
      hitFunc
    };
  }

  @action
  didUpdateContent() {
    this.batchDraw();
  }

}
