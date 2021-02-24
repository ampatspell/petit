import Node from './-node';

export default class SceneNode extends Node {

  typeName = 'Scene';

  get group() {
    return this;
  }

  async createNewLayer() {
    return this._createNode({
      type: 'scene/layer',
      identifier: 'untitled',
      version: 1
    });
  }

}
