import Node, { child } from './-node';

export default class SpriteNode extends Node {

  typeName = 'Sprite';
  group = this;

  @child('sprite/frames') frames;

  async _createFrames() {
    return this._createNode({
      type: 'sprite/frames',
      expanded: true,
      version: 1
    });
  }

  async maybeCreateFrames() {
    let { frames } = this;
    if(!frames) {
      frames = await this._createFrames();
    }
    return frames;
  }

  async createNewFrame() {
    let frames = await this.maybeCreateFrames();
    return await frames.createNewFrame();
  }

}
