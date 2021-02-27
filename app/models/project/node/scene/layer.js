import Node, { lock, hide, warnings, expand } from '../-node';

export default class LayerNode extends Node {

  typeName = 'Scene Layer';

  constructor() {
    super(...arguments);
    lock(this);
    hide(this);
    expand(this);
    warnings(this);
  }

  get group() {
    return this.parent;
  }

}
