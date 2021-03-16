import Base from './-base';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSceneLayerEntitySpriteFrameComponent extends Base {

  @reads('entity.sprite.model') sprite;

  // TODO: reference
  get frame() {
    return this.sprite?.frames[0];
  }

}
