import Node from '../-node';
import { heart } from 'petit/util/heart';
import { lastObject, firstObject, nextObject, prevObject } from 'petit/util/array';
import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";

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

  //

  @tracked _frame;

  get frame() {
    let frame = this._frame;
    if(!frame) {
      frame = this.children[0] || null;
    }
    return frame;
  }

  select(frame) {
    this._frame = frame;
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
      this._frame = next;
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
      this._frame = next;
    }
  }


}
