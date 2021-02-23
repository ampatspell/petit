import Node from './-node';

export default class SceneNode extends Node {

  async createNewLayer() {
    return this._createNode({
      type: 'layer',
      identifier: 'untitled',
      version: 1
    });
  }

}
