import Node, { data, reference, editor, lock, hide, warnings, expand, pixel, tools as _tools } from './-node';
import { reads } from "macro-decorators";

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' },
  { icon: 'pen',           type: 'edit' },
  { icon: 'expand',        type: 'resize' }
]);

const color = palette => (_target, key) => {
  return {
    get() {
      let color = this.doc.data[key] || 0;
      return this[palette]?.model?.colors[color] || null;
    },
    set(color) {
      this.doc.data[key] = color?.index || 0;
      this._scheduleSave.schedule();
    }
  };
}

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
  }

  typeName = 'Scene';
  group = this;
  referenceKeys = [ 'palette' ];

  @reads('children') layers;

  @data('x') x;
  @data('y') y;
  @data('width') width;
  @data('height') height;
  @data('palette') _palette;

  @reference('palette', '_palette') palette;

  // TODO: use the same for sprite
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
