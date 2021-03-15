import Group from 'ember-cli-konva/components/konva/node/group';
import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";

export default class EntityComponent extends Group {

  @reads('args.node') entity;
  @reads('entity.scene') scene;
  @reads('scene.pixel.absolute') pixel;

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
    let { entity: { x, y }, pixel } = this;
    let s = value => value * pixel;
    return {
      x: s(x),
      y: s(y)
    };
  }

}
