import Node from '../-node';
import { editable } from '../-node/editable';
import { warnings } from '../-node/warnings';
import { hide } from '../-node/hide';
import { lock } from '../-node/lock';
import { expand } from '../-node/expand';
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
