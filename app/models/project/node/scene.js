import Node, { editor, lock, hide, warnings, expand } from './-node';

export default class SceneNode extends Node {

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    warnings(this);
    expand(this);
  }

  typeName = 'Scene';

  group = this;
  groups = [ this ];

  async createNewLayer() {
    return this._createNode({
      type: 'scene/layer',
      version: 1
    });
  }

}
