import Node from './-node';
import { lastObject, firstObject, nextObject, prevObject } from '../../../util/array';

export default class SpriteNode extends Node {

  typeName = 'Sprite';

  get group() {
    return this;
  }

  async createNewFrame() {
    return this._createNode({
      type: 'sprite/frame',
      identifier: 'untitled',
      version: 1
    });
  }

  //

  get needsTimeline() {
    return this.children.length > 0;
  }

  get frame() {
    let selected = this.nodes.selected;
    if(selected && selected.group === this) {
      if(selected === this) {
        return this.children[0] || null;
      }
      return selected;
    }
    return null;
  }

  selectPrevFrame() {
    let { frame, children } = this;
    if(!frame) {
      return;
    }

    let next = prevObject(children, frame);
    if(!next) {
      next = lastObject(children);
    }

    if(next) {
      this.nodes.select(next, { expandParents: true });
    }
  }

  selectNextFrame() {
    let { frame, children } = this;
    if(!frame) {
      return;
    }

    let next = nextObject(children, frame);
    if(!next) {
      next = firstObject(children);
    }

    if(next) {
      this.nodes.select(next, { expandParents: true });
    }
  }

}
