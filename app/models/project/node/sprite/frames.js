import Node, { editor, lock, hide, reference, data } from '../-node';
import { heart } from 'petit/util/heart';
import { lastObject, firstObject, nextObject, prevObject } from 'petit/util/array';
import { reads } from "macro-decorators";
import { editing } from 'petit/util/editing';

const color = () => {
  return {
    get() {
      let color = this._color || 0;
      return this.palette.model.colors[color] || null;
    },
    set(color) {
      this.doc.data.color = color?.index || 0;
      this._scheduleSave.schedule();
    }
  };
}

export default class SpriteFramesNode extends Node {

  typeName = 'Frames';
  referenceKeys = [ 'palette' ];

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
  }

  group = this;

  @data('frame') _frame;
  @data('palette') _palette;

  @reads('parent') sprite;

  @reference('palette', '_palette') palette;

  // TODO: move to this.editor
  @data('color') _color;
  @color color;

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

  //

  onKeyLeft() {
    this.selectPrev();
  }

  onKeyRight() {
    this.selectNext();
  }

}
