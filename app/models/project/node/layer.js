import Node from './-node';

export default class LayerNode extends Node {

  get group() {
    return this.parent;
  }

}
