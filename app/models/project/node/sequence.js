import Node, { data, editor, lock, hide, warnings, pixel, reference, tools as _tools } from './-node';
import { frames } from './sequence/frames';

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
    pixel(this);
    tools(this);
    frames(this, {
      key: 'frames',
      sprite: 'sprite'
    });
  }

}
