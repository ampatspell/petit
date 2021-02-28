import Node, { editor, lock, hide, expand, warnings, data, reference, pixel } from './-node';
import { heart } from 'petit/util/heart';
import { lastObject, firstObject, nextObject, prevObject } from 'petit/util/array';
import { editing } from 'petit/util/editing';
import { reads } from "macro-decorators";

const {
  assign
} = Object;

const defaultBytes = node => {
  if(node.frames.length > 0) {
    return;
  }
  let { width, height } = node;
  if(width !== 16 || height !== 16) {
    return;
  }
  return node.store.blobFromUint8Array(new Uint8Array(heart));
};

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

export default class SpriteNode extends Node {

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    expand(this);
    warnings(this);
    pixel(this);
  }

  typeName = 'Sprite';
  group = this;
  referenceKeys = [ 'palette' ];

  async createNewFrame(opts) {
    let { bytes, select } = assign({ select: true }, opts);
    return this._createNode({
      type: 'sprite/frame',
      bytes: bytes || defaultBytes(this),
      version: 1
    }, { select });
  }

  //

  get needsTimeline() {
    return this.children.length > 0;
  }

  //

  @data('width') width;
  @data('height') height;

  //

  @data('palette') _palette;
  @reference('palette', '_palette') palette;

  //

  @reads('children') frames;
  @data('frame') _frame;

  get frame() {
    let index = this._frame;
    return this.frames.find(child => child.index === index) || this.frames[0] || null;
  }

  select(frame) {
    this.update({ frame: frame?.index || 0 });
    this.nodes.select(frame);
  }

  didMoveFrame(frame) {
    this.select(frame);
  }

  //

  // TODO: move to this.editor
  @data('color') _color;
  @color color;

  //

  selectPrev() {
    let { frame, frames } = this;
    if(!frame) {
      return;
    }

    let next = prevObject(frames, frame);
    if(!next) {
      next = lastObject(frames);
    }

    if(next) {
      this.select(next);
    }
  }

  selectNext() {
    let { frame, frames } = this;
    if(!frame) {
      return;
    }

    let next = nextObject(frames, frame);
    if(!next) {
      next = firstObject(frames);
    }

    if(next) {
      this.select(next);
    }
  }

  //

  @editing('lock.locked') editing;

  didDeselect(next) {
    if(next === this || next?.parent === this) {
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

  onKeyNumber(n) {
    if(n === 0) {
      return;
    }
    let color = this.palette.model?.colors[n - 1];
    if(color) {
      this.color = color;
    }
  }

}
