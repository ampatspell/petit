import Node from './-doc-node';
import { data } from './-node/doc';
import { editor } from './-node/editor';
import { lock } from './-node/lock';
import { editable } from './-node/editable';
import { hide } from './-node/hide';
import { expand } from './-node/expand';
import { reference } from './-node/reference';
import { tools as _tools } from './-node/tools';
import { color } from './-node/color';
import { pixel } from './-node/pixel';
import { warnings } from './-node/warnings';
import { reads } from "macro-decorators";

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' },
  { icon: 'pen',           type: 'edit' },
  { icon: 'expand',        type: 'resize', overlaysHidden: true }
]);

export default class SceneNode extends Node {

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    warnings(this);
    expand(this);
    pixel(this);
    tools(this);
    editable(this);
  }

  typeName = 'Scene';
  group = this;
  referenceKeys = [ 'palette', 'background' ];

  @reads('children') layers;
  @reads('visibleChildren') visibleLayers;

  @data('x') x;
  @data('y') y;
  @data('width') width;
  @data('height') height;
  @data('palette') _palette;

  @reference('palette', '_palette') palette;

  @color('palette') background;

  async createNewLayer() {
    return this._createNode({
      type: 'scene/layer',
      version: 1
    });
  }

  //

  resize({ handle, x, y, width, height }) {
    this.layers.forEach(layer => layer.resize(handle, { width, height }));
    this.editor.update({ x, y });
    this.update({ width, height });
  }

  //

  onKeyEsc() {
    this.tools.selectByType('idle');
  }

  onKeyLetter(key) {
    if(key === 'e') {
      this.tools.selectByType('edit');
    } else if(key === 'r') {
      this.tools.selectByType('resize');
    }
  }

}
