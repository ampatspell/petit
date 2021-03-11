import Model from '../../-model';
import { inject as service } from "@ember/service";
import { move } from './-node/properties';
import { cached } from "tracked-toolbox";
import { firstObject, lastObject } from '../../../util/array';
import { assert } from '@ember/debug';

export default class Node extends Model {

  @service store;

  nodes;

  referenceKeys = [];

  constructor(owner, { nodes }) {
    super(owner);
    assert(`nodes is required`, !!nodes);
    this.nodes = nodes;
    move(this);
  }

  // TODO: selected
  @cached
  get selected() {
    return this.nodes.selected === this;
  }

  // TODO: selected
  @cached
  get hasSelectedChild() {
    return !!this.children.find(node => {
      if(node.selected) {
        return true;
      }
      return node.hasSelectedChild;
    });
  }

  //

  get parentChildren() {
    let { parent } = this;
    return parent ? parent.children : this.nodes.root;
  }

  hasParent(node) {
    let { parent } = this;
    if(parent === node) {
      return true;
    }
    return parent?.hasParent(node);
  }

  @cached
  get isFirst() {
    return firstObject(this.parentChildren) === this;
  }

  @cached
  get isLast() {
    return lastObject(this.parentChildren) === this;
  }

  get hasChildren() {
    return this.children.length > 0;
  }

  @cached
  get visibleChildren() {
    let visible = arr => arr.filter(node => !node.hide || !node.hide.hidden);
    return visible(this.children).reverse();
  }

  async _createNode(props, opts) {
    this.expand?.expand();
    return this.nodes._createNode(this, props, opts);
  }

  _normalizeReferences(props) {
    let { referenceKeys } = this;
    let hash = {};
    for(let key in props) {
      let value = props[key];
      if(referenceKeys.includes(key)) {
        value = value?.identifier || null;
      }
      hash[key] = value;
    }
    return hash;
  }

}
