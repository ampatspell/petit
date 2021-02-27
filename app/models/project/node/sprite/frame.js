import Node, { data } from '../-node';
import { Pixel } from '../../../../util/pixel';
import { reads } from "macro-decorators";

export default class SpriteFrameNode extends Node {

  typeName = 'Frame';

  @reads('parent') sprite;

  get group() {
    return this.parent;
  }

  //

  @reads('sprite.width') width;
  @reads('sprite.height') height;
  @reads('sprite.pixel') pixel;

  //

  @reads('sprite.palette') palette;

  //

  @data('bytes') _blob;

  get bytes() {
    let blob = this._blob;
    if(!blob) {
      return new Uint8Array(this.width * this.height);
    }
    return blob.toUint8Array();
  }

  _blobFromUint8Array(bytes) {
    return this.store.blobFromUint8Array(bytes);
  }

  mutateBytes(cb) {
    let { bytes } = this;
    let ret = cb(bytes);
    if(ret === false) {
      return;
    }
    bytes = this._blobFromUint8Array(bytes);
    this.update({ bytes });
  }

  setPixel(index, value) {
    this.mutateBytes(bytes => bytes[index] = value);
  }

  clear() {
    this.mutateBytes(bytes => bytes.fill(Pixel.transparent));
  }

  //

  async duplicate() {
    let { bytes, group } = this;
    bytes = this._blobFromUint8Array(bytes);
    return await group.createNewFrame({ bytes });
  }

  //

  didDeselect(next) {
    this.sprite.didDeselect(next);
  }

  didSelect() {
    this.sprite.select(this);
  }

  didMove() {
    this.sprite.didMoveFrame(this);
  }

  //

  onKeyLeft() {
    this.sprite.onKeyLeft();
  }

  onKeyRight() {
    this.sprite.onKeyRight();
  }

  onKeyNumber() {
    this.sprite.onKeyNumber(...arguments);
  }

}
