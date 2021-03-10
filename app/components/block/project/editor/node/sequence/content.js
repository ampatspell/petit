import Shape from 'ember-cli-konva/components/konva/node/shape';
import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";
import { tracked } from "@glimmer/tracking";
import { next, later } from '@ember/runloop';
import { nextObject, firstObject } from 'petit/util/array';

export default class BlockProjectEditorNodeSequenceContentComponent extends Shape {

  @reads('args.size') size;
  @reads('args.sprite') sprite;

  @tracked _frame;

  get frame() {
    let { _frame, sprite } = this;
    return _frame || sprite?.frames[0];
  }

  @cached
  get sceneFunc() {
    let { size } = this;
    return ctx => {
      ctx.imageSmoothingEnabled = false;
      let { frame } = this;
      if(frame) {
        ctx.drawImage(frame.rendered.content, 0, 0, size.width, size.height);
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

  didCreateNode() {
    super.didCreateNode(...arguments);
    this.animate();
  }

  nextFrame() {
    let { frame, sprite } = this;
    let next;
    if(sprite) {
      let { frames } = sprite;
      next = nextObject(frames, frame);
      if(!next) {
        next = firstObject(frames);
      }
    }
    this._frame = next;
  }

  animate() {
    if(this.isDestroying) {
      return;
    }

    this.batchDraw();

    next(() => this.nextFrame());
    later(() => this.animate(), 1000 / 10);
  }

}
