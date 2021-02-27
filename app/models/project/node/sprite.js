import Node, { editor, lock, hide, expand, warnings, data, reference } from './-node';
import { heart } from 'petit/util/heart';
import { lastObject, firstObject, nextObject, prevObject } from 'petit/util/array';
import { editing } from 'petit/util/editing';

const {
  assign
} = Object;

const defaultBytes = node => node.store.blobFromUint8Array(new Uint8Array(heart));

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
  }

  typeName = 'Sprite';
  group = this;
  groups = [ this ];
  referenceKeys = [ 'palette' ];

  async createNewFrame(opts) {
    let { bytes } = assign({ bytes: defaultBytes(this) }, opts);
    return this._createNode({
      type: 'sprite/frame',
      bytes,
      version: 1
    });
  }

  //

  get needsTimeline() {
    return this.children.length > 0;
  }

  //

  @data('palette') _palette;
  @reference('palette', '_palette') palette;

  //

  @data('frame') _frame;

  get frame() {
    let index = this._frame;
    return this.children.find(child => child.index === index) || this.children[0] || null;
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

}
