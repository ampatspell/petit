import Group from 'ember-cli-konva/components/konva/node/group';
import { reads } from "macro-decorators";

export default class EntityComponent extends Group {

  @reads('args.node') entity;
  @reads('entity.scene') scene;
  @reads('scene.pixel.absolute') pixel;

  get nodeProperties() {
    let { entity: { x, y }, pixel } = this;
    let s = value => value * pixel;
    return {
      x: s(x),
      y: s(y)
    };
  }

  didCreateNode() {
    this.on('mousedown', () => {
      console.log('entity');
    });
  }

}
