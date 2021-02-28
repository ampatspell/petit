import Node, { editor, lock, hide, warnings, expand, pixel } from './-node';

export default class SceneNode extends Node {

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    warnings(this);
    expand(this);
    pixel(this);
  }

  typeName = 'Scene';

  group = this;

  async createNewLayer() {
    return this._createNode({
      type: 'scene/layer',
      version: 1
    });
  }

}
