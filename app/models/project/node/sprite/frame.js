import Node, { data } from '../-node';

export default class SpriteFrameNode extends Node {

  typeName = 'Sprite Frame';

  width = 16;
  height = 16;
  pixel = 20;

  @data('bytes') _blob;

  get bytes() {
    let blob = this._blob;
    if(!blob) {
      return new Uint8Array(this.width * this.height);
    }
    return blob.toUint8Array();
  }

  get group() {
    return this.parent;
  }

  mutateBytes(cb) {
    let { bytes } = this;
    let ret = cb(bytes);
    if(ret === false) {
      return;
    }
    bytes = this.store.blobFromUint8Array(bytes);
    this.update({ bytes });
  }

  setPixel(index, value) {
    this.mutateBytes(bytes => {
      bytes[index] = value;
    });
  }

}
