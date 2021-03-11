import Node from '../-doc-node';
import { data } from '../-node/decorators';
import { editable } from '../-node/properties';
import { toIndex } from '../../../../util/pixel';
import { reads } from "macro-decorators";
import { rendered } from './frame/rendered';

export default class SpriteFrameNode extends Node {

  typeName = 'Frame';

  constructor() {
    super(...arguments);
    rendered(this);
    editable(this);
  }

  @reads('parent') sprite;

  get group() {
    return this.parent;
  }

  //

  @reads('sprite.width') width;
  @reads('sprite.height') height;
  @reads('sprite.pixel') pixel;
  @reads('sprite.colors') colors;

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
    this.sprite.didMutateFrameBytes(this);
  }

  setPixel(index, color) {
    let value = this.colors.valueForColor(color);
    this.mutateBytes(bytes => bytes[index] = value);
  }

  clear() {
    this.mutateBytes(bytes => bytes.fill(0));
  }

  //

  async duplicate() {
    let { bytes, group } = this;
    bytes = this._blobFromUint8Array(bytes);
    return await group.createNewFrame({ bytes });
  }

  resize(handle, size) {
    let source = {
      bytes: new Uint8Array(this.bytes),
      size: {
        width: this.width,
        height: this.height
      }
    };

    let target = {
      bytes: new Uint8Array(size.width * size.height),
      size
    };

    for(let y = 0; y < source.size.height; y++) {
      for(let x = 0; x < source.size.width; x++) {
        let value = source.bytes[toIndex(x, y, source.size)];
        if(handle === 'right' || handle === 'bottom') {
          target.bytes[toIndex(x, y, target.size)] = value;
        } else if(handle === 'top') {
          let d = target.size.height - source.size.height;
          let ty = y + d;
          target.bytes[toIndex(x, ty, target.size)] = value;
        } else if(handle === 'left') {
          let d = target.size.width - source.size.width;
          let tx = x + d;
          if(tx >= 0) {
            target.bytes[toIndex(tx, y, target.size)] = value;
          }
        }
      }
    }

    let bytes = this._blobFromUint8Array(target.bytes);
    this.update({ bytes });
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

}
