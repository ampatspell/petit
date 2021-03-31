import Node from './-doc-node';
import { data, reference, color } from './-node/decorators';
import { editor, lock, editable, hide, expand, tools as _tools, pixel, warnings } from './-node/properties';
import { reads } from "macro-decorators";

const tools = _tools([ 'idle', 'edit', 'resize', 'center' ]);

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
  @data('borders') borders;
  @data('palette') _palette;

  @reference('palette', '_palette') palette;

  @color('palette') background;

  async createNewLayer() {
    return this._createNode({
      type: 'scene/layer',
      x: 0,
      y: 0,
      grid: {
        x: 8,
        y: 8,
        enabled: false
      },
      version: 1
    });
  }

  //

  resize({ handle, x, y, width, height }) {
    this.layers.forEach(layer => layer.resize(handle, { width, height }));
    this.editor.update({ x, y });
    this.update({ width, height });
  }

}
