import Node from '../-doc-node';
import { lock, editable, hide, expand, warnings } from '../-node/properties';
import { data } from '../-node/decorators';
import { reads } from "macro-decorators";

export default class LayerNode extends Node {

  typeName = 'Scene Layer';

  constructor() {
    super(...arguments);
    lock(this);
    hide(this);
    expand(this);
    warnings(this);
    editable(this);
  }

  get group() {
    return this.parent;
  }

  @reads('parent') scene;

  @data('x') x;
  @data('y') y;

  resize() {
  }

  //

  createNewSpriteFrameEntity() {
    return this._createNode({
      type: 'entity/sprite-frame',
      x: 0,
      y: 0,
      version: 1
    });
  }

  createNewSequenceEntity() {
    return this._createNode({
      type: 'entity/sequence',
      x: 0,
      y: 0,
      version: 1
    });
  }

}
