import Base from './-base';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSceneLayerEntitySpriteFrameComponent extends Base {

  @reads('entity.sprite.model') sprite;
  @reads('entity.frame.model') frame;

}
