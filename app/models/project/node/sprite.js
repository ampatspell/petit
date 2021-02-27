import Node, { child, reference, data, lock, hide, expand, warnings } from './-node';

export default class SpriteNode extends Node {

  constructor() {
    super(...arguments)
    lock(this);
    hide(this);
    expand(this);
    warnings(this);
  }

  typeName = 'Sprite';
  group = this;
  referenceKeys = [ 'palette' ];

  get groups() {
    return [ this.frames ].filter(Boolean);
  }

  @data('palette') _palette;
  @reference('palette', '_palette') palette;

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
