import Node, { editor, editable, lock, hide, expand, warnings, data, reference, pixel, tools as _tools } from './-node';
import { heart } from 'petit/util/heart';
import { nextObject, prevObject, uniq } from 'petit/util/array';
import { reads } from "macro-decorators";
import { colors } from './sprite/colors';
import { Warning } from './-node/warnings';

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
}

// TODO: use sprite.colors
const color = () => {
  return {
    get() {
      let color = this.doc.data.color || 0;
      return this.palette.model?.colors[color] || null;
    },
    set(model) {
      let color = model?.index || 0;
      this.update({ color });
    }
  };
}

class MissingColors extends Warning {

  get description() {
    return 'Missing colors';
  }

  get has() {
    return this.node.colors.missing?.length > 0;
  }

}

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' },
  { icon: 'pen',           type: 'edit' },
  { icon: 'expand',        type: 'resize', overlaysHidden: true }
]);

export default class SpriteNode extends Node {

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    expand(this);
    warnings(this, {
      add: [ MissingColors ]
    });
    pixel(this);
    tools(this);
    editable(this);
    colors(this, {
      key: 'colors',
      palette: 'palette',
      used: 'uniqueFrameBytes'
    });
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

  @data('x') x;
  @data('y') y;
  @data('width') width;
  @data('height') height;

  //

  @data('palette') _palette;
  @reference('palette', '_palette') palette;

  @color color;

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

  get uniqueFrameBytes() {
    return uniq(this.frames.reduce((ret, frame) => ([...ret, ...frame.bytes]), []));
  }

  //

  selectPrev() {
    let { frame, frames } = this;
    if(!frame) {
      return;
    }
    let next = prevObject(frames, frame, true);
    if(next) {
      this.select(next);
    }
  }

  selectNext() {
    let { frame, frames } = this;
    if(!frame) {
      return;
    }
    let next = nextObject(frames, frame, true);
    if(next) {
      this.select(next);
    }
  }

  //

  didDeselect(next) {
    if(next === this || next?.parent === this) {
      return;
    }
    this.tools.reset();
  }

  didMutateFrameBytes() {
    this.colors.compact();
  }

  //

  resize({ handle, x, y, width, height }) {
    if(width > 1024 || height > 1024) {
      return;
    }
    this.frames.forEach(frame => frame.resize(handle, { width, height }));
    this.editor.update({ x, y });
    this.update({ width, height });
  }

}
