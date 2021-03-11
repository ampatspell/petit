import Node, { data, editor, lock, hide, warnings, pixel, reference, tools as _tools, expand } from './-node';
import { models } from 'zuglet/decorators';
import { cached } from "tracked-toolbox";
import { sortedBy, lastObject } from 'petit/util/array';

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' }
]);

const size = (_target, key) => ({
  get() {
    return this.sprite.model?.[key] || 16;
  }
});

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
    warnings(this);
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
    this._scheduleSave.schedule();
  }

}
