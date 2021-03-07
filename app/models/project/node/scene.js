import Node, { data, reference, editor, editable, lock, hide, warnings, expand, pixel, tools as _tools } from './-node';
import { reads } from "macro-decorators";

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' },
  { icon: 'pen',           type: 'edit' },
  { icon: 'expand',        type: 'resize' }
]);

// TODO: missing reference handling
const color = palette => (_target, key) => {
  return {
    get() {
      let color = this.doc.data[key];
      return this[palette]?.model?.colors.find(model => model.identifier === color) || null;
    },
    set(color) {
      this.doc.data[key] = color?.identifier || null;
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
    editable(this);
  }

  typeName = 'Scene';
  group = this;
  referenceKeys = [ 'palette' ];

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
