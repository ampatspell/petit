import Node from './-node';

export default class SceneNode extends Node {

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
