import Node from '../-doc-node';
import { lock, editable, hide, expand, warnings } from '../-node/properties';
import { reads } from "macro-decorators";

export default class LayerNode extends Node {

  typeName = 'Scene Layer';

  constructor() {
    super(...arguments);
    lock(this);
    hide(this);
    expand(this);
    warnings(this);
    editable(this);
  }

  get group() {
    return this.parent;
  }

  @reads('parent') scene;

  resize() {
  }

}
