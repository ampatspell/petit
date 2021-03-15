import Entity from './-entity';
import { data, reference } from '../-node/decorators';
import { reads } from "macro-decorators";

export default class SpriteFrameEntity extends Entity {

  typeName = 'Sprite Frame Entity';
  referenceKeys = [ 'sprite' ];

  @data('sprite') _sprite;
  @reference('sprite', '_sprite') sprite;

  @reads('sprite.model.width') width;
  @reads('sprite.model.height') height;

}
