import Node from '../-node';

export default class LayerNode extends Node {

  typeName = 'Scene Layer';

  get group() {
    return this.parent;
  }

}
