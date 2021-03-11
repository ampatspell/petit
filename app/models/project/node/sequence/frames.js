class SequenceFrames {

  constructor(node) {
    this.node = node;
  }

}

export const frames = (node, opts) => {
  node.frames = new SequenceFrames(node, opts);
}
