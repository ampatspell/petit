import Node from './-node';
import { data } from './-node/doc';
import { editor } from './-node/editor';
import { lock } from './-node/lock';
import { editable } from './-node/editable';
import { hide } from './-node/hide';
import { expand } from './-node/expand';
import { reference } from './-node/reference';
import { warnings } from './-node/warnings';
import { pixel } from './-node/pixel';
import { tools as _tools } from './-node/tools';
import { models } from 'zuglet/decorators';
import { cached } from "tracked-toolbox";
import { sortedBy, lastObject } from 'petit/util/array';
import { Warning } from './-node/warnings';

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' }
]);

const size = (_target, key) => ({
  get() {
    return this.sprite.model?.[key] || 16;
  }
});

class MissingFrames extends Warning {

  get description() {
    return 'Missing frames';
  }

  @cached
  get has() {
    return this.node.sprite && this.node.frames.filter(frame => !frame.frame).length > 0;
  }

}

export default class SequenceyNode extends Node {

  typeName = 'Sequence';
  group = this;
  referenceKeys = [ 'sprite' ];

  @data('x') x;
  @data('y') y;

  @data('sprite') _sprite;
  @reference('sprite', '_sprite') sprite;

  @size width;
  @size height;

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    editable(this);
    warnings(this, {
      add: [ MissingFrames ]
    });
    expand(this);
    pixel(this);
    tools(this);
  }

  @data('frames') _frames;

  @models()
    .source(({ _frames }) => _frames)
    .named('project/node/sequence/frame')
    .mapping((data, parent) => ({ key: 'frames', parent, data }))
  frames;

  @cached
  get children() {
    return sortedBy(this.frames, 'index');
  }

  addNewFrame() {
    let index = lastObject(this.children)?.index || 0;
    this._frames.push({
      index,
      identifier: ''
    });
    this.scheduleSave.schedule();
  }

}
