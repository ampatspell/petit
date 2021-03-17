import Base from './-base';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSceneLayerEntitySpriteComponent extends Base {

  @reads('entity.sprite.model') sprite;
  @reads('entity.frame.model') frame;

}
