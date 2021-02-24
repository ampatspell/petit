import Node from '../-node';

export default class SpriteFrameNode extends Node {

  typeName = 'Sprite Frame';

  get group() {
    return this.parent;
  }

}
