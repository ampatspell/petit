import Node from '../-node';

export default class SpriteFrameNode extends Node {

  get group() {
    return this.parent;
  }

}
