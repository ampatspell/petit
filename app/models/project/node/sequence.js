import Node from './-doc-node';
import { data, reference } from './-node/decorators';
import { editor, lock, editable, hide, expand, tools as _tools, pixel, warnings, Warning, selection } from './-node/properties';
import { models } from 'zuglet/decorators';
import { cached } from "tracked-toolbox";
import { sortedBy, lastObject } from 'petit/util/array';

const tools = _tools([ 'idle', 'center' ]);

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
  hasDataChildren = true;

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
    selection(this);
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

  get needsTimeline() {
    return this.children.length > 0;
  }

  addNewFrame() {
    let index = lastObject(this.children)?.index || 0;
    let identifier = this.nodes.createIdentifier('sequence/frame');
    this._frames.push({
      index,
      identifier,
      frame: null
    });
    this.scheduleSave.schedule();
  }

  deleteAllFrames() {
    this.update({ frames: [] });
  }

}
