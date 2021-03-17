import Entity from './-entity';
import { data, reference } from '../../-node/decorators';
import { reads } from "macro-decorators";

const frameByIdentifier = (node, _type, identifier) => node.sprite.model?.frameByIdentifier(identifier);

export default class SpriteEntity extends Entity {

  typeName = 'Sprite Entity';
  referenceKeys = [ 'sprite', 'frame' ];

  @data('sprite') _sprite;
  @reference('sprite', '_sprite') sprite;

  @reads('sprite.model.width') width;
  @reads('sprite.model.height') height;

  @data('frame') _frame;
  @reference('sprite/frame', '_frame', frameByIdentifier) frame;

}
