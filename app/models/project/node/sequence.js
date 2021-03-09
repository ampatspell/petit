import Node, { data, editor, lock, hide, warnings, pixel, reference, tools as _tools } from './-node';

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' }
]);

export default class SequenceyNode extends Node {

  typeName = 'Sequence';
  group = this;
  referenceKeys = [ 'sprite' ];

  @data('x') x;
  @data('y') y;

  @data('sprite') _sprite;
  @reference('sprite', '_sprite') sprite;

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    warnings(this);
    pixel(this);
    tools(this);
  }

}
