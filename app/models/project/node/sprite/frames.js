import Node, { data } from '../-node';
import { heart } from 'petit/util/heart';
import { lastObject, firstObject, nextObject, prevObject } from 'petit/util/array';
import { reads } from "macro-decorators";
import { editing } from 'petit/util/editing';

export default class SpriteFramesNode extends Node {

  typeName = 'Frames';
  group = this;

  @data('frame') _frame;

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

  //

  get frame() {
    let index = this._frame;
    return this.children.find(child => child.index === index) || this.children[0] || null;
  }

  select(frame) {
    this.update({ frame: frame?.index || 0 });
    this.nodes.select(frame);
  }

  //

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
      this.select(next);
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
      this.select(next);
    }
  }

  //

  @editing('lock.locked') editing;

  didDeselect(next) {
    if(next && next.parent === this || next === this) {
      return;
    }
    this.editing = false;
  }

}
