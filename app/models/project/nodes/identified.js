import Model from '../../-model';
import { assert } from '@ember/debug';
import { cached } from "tracked-toolbox";

const identified = (_target, key) => cached(_target, key, {
  get() {
    return this.nodes.all.filter(model => model.type === key && model.identifier);
  }
});

export default class IdentifiedNodes extends Model {

  constructor(owner, { nodes }) {
    super(owner);
    this.nodes = nodes;
  }

  @identified palette;
  @identified sprite;
  @identified sequence;

  byTypeAndIdentifier(type, identifier) {
    let typed = this[type];
    assert(`nodes.${type} is required`, !!typed);
    return typed.find(node => node.identifier === identifier);
  }

}
