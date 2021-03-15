import Base from './-base';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSceneLayerEntitySpriteFrameComponent extends Base {

  @reads('entity.sprite.model') sprite;

  // TODO: reference
  get frame() {
    return this.sprite?.frames[0];
  }

  // TODO: move to editor
  get size() {
    let { entity: { width, height }, pixel } = this;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

}
