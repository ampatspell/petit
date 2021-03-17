import Node from '../-doc-node';
import { lock, editable, hide, expand, warnings, grid } from '../-node/properties';
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
    grid(this);
  }

  @reads('parent') group;
  @reads('parent') scene;

  @data('x') x;
  @data('y') y;

  resize() {
  }

  //

  createNewSpriteFrameEntity(opts={}) {
    let { sprite, frame } = opts;
    sprite = sprite?.identifier || null;
    frame = frame?.identifier || null;
    return this._createNode({
      type: 'scene/entity/sprite',
      x: 0,
      y: 0,
      sprite,
      frame,
      version: 1
    });
  }

  createNewSequenceEntity(opts={}) {
    let { sequence } = opts;
    sequence = sequence?.identifier || null;
    return this._createNode({
      type: 'scene/entity/sequence',
      x: 0,
      y: 0,
      sequence,
      version: 1
    });
  }

}
