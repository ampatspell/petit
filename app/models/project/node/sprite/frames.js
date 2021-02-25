import Node from '../-node';
import { heart } from '../../../../util/heart';

export default class SpriteFramesNode extends Node {

  typeName = 'Frames';

  get group() {
    return this.parent.group;
  }

  async createNewFrame({ bytes=null }={}) {
    bytes = bytes || this.store.blobFromUint8Array(new Uint8Array(heart)); // TODO: temporary. needs centering
    return this._createNode({
      type: 'sprite/frame',
      bytes,
      version: 1
    });
  }

}
