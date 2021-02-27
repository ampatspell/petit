import Node, { lock, hide, warnings } from '../-node';

export default class LayerNode extends Node {

  typeName = 'Scene Layer';

  constructor() {
    super(...arguments);
    lock(this);
    hide(this);
    warnings(this);
  }

  get group() {
    return this.parent;
  }

}
