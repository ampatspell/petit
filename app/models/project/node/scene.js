import Node from './-node';

export default class SceneNode extends Node {

  get group() {
    return this;
  }

  async createNewLayer() {
    return this._createNode({
      type: 'layer',
      identifier: 'untitled',
      version: 1
    });
  }

}
