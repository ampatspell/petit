import Shape from 'ember-cli-konva/components/konva/node/shape';
import { action } from "@ember/object";
import { next, later } from '@ember/runloop';
import { nextObject } from 'petit/util/array';
import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";
import { cached } from "tracked-toolbox";
import { unwrapReference } from 'petit/util/reference';

export default class BlockKonvaFramesComponent extends Shape {

  @reads('args.size') size;
  @reads('args.frames') frames;

  interval = 1000 / 3;

  @tracked _frame;

  get frame() {
    let { _frame, frames } = this;
    return _frame || frames?.[0];
  }

  get content() {
    let { frame, args: { key } } = this;
    if(key) {
      frame = frame?.[key];
    }
    frame = unwrapReference(frame);
    return frame?.rendered?.content;
  }

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

  didCreateNode() {
    super.didCreateNode(...arguments);
    this.animate();
  }

  nextFrame() {
    let { frame, frames } = this;
    let next;
    if(frames) {
      next = nextObject(frames, frame, true);
    }
    this._frame = next;
  }

  animate() {
    if(this.isDestroying) {
      return;
    }
    this.batchDraw();
    next(() => this.nextFrame());
    later(() => this.animate(), this.interval);
  }

  @action
  didUpdateFrames() {
    this.nextFrame();
    this.batchDraw();
  }

}
