import Group from 'ember-cli-konva/components/konva/node/group';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSceneLayerEntityComponent extends Group {

  @reads('args.node') entity;
  @reads('entity.scene') scene;
  @reads('scene.pixel.absolute') pixel;

  get size() {
    let { entity: { width, height }, pixel } = this;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
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

  didCreateNode() {
    this.on('mousedown', () => {
      let { entity, entity: { nodes } } = this;
      nodes.select(entity);
    });
  }

}
