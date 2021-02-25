import Node from '../-node';
import { heart } from 'petit/util/heart';
import { lastObject, firstObject, nextObject, prevObject } from 'petit/util/array';
import { reads } from "macro-decorators";

export default class SpriteFramesNode extends Node {

  typeName = 'Frames';
  group = this;

  @reads('parent') sprite;

  get needsTimeline() {
    return this.children.length > 0;
  }

  async createNewFrame({ bytes=null }={}) {
    bytes = bytes || this.store.blobFromUint8Array(new Uint8Array(heart)); // TODO: temporary. needs centering
    return this._createNode({
      type: 'sprite/frame',
      bytes,
      version: 1
    });
  }

  get frame() {
    let selected = this.nodes.selected;
    if(selected && selected.group === this) {
      if(selected === this) {
        return this.children[0] || null;
      }
      return selected;
    }
    return null;
  }

  selectPrev() {
    let { frame, children } = this;
    if(!frame) {
      return;
    }

    let next = prevObject(children, frame);
    if(!next) {
      next = lastObject(children);
    }

    if(next) {
      this.nodes.select(next, { expandParents: true });
    }
  }

  selectNext() {
    let { frame, children } = this;
    if(!frame) {
      return;
    }

    let next = nextObject(children, frame);
    if(!next) {
      next = firstObject(children);
    }

    if(next) {
      this.nodes.select(next, { expandParents: true });
    }
  }


}
