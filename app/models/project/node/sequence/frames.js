import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";

class SequenceFrame {

  constructor(frames, data) {
    this.frames = frames;
    this.data = data;
  }

  @reads('data.identifier') identifier;

  @cached
  get frame() {
    let { frames, identifier } = this;
    return frames.sprite?.frameByIdentifier(identifier);
  }

}

class SequenceFrames {

  constructor(node, opts) {
    this.node = node;
    this.opts = opts;
  }

  get sprite() {
    let { node, opts } = this;
    return node[opts.sprite]?.model;
  }

  get data() {
    let { node, opts } = this;
    return node.doc.data[opts.key];
  }

  @cached
  get all() {
    return this.data.map(data => new SequenceFrame(this, data));
  }

}

export const frames = (node, opts) => {
  node.frames = new SequenceFrames(node, opts);
}
