import Model, { doc, data } from '../../-model';
import { activate } from 'zuglet/decorators';
import { scheduleSave } from '../../../util/schedule-save';
import { firstObject, lastObject, sortedBy, prevObject, nextObject } from '../../../util/array';
import { inject as service } from "@ember/service";
import { editor } from './-node/editor';
import { lock } from './-node/lock';
import { hide } from './-node/hide';
import { warnings } from './-node/warnings';
import { reference } from './-node/reference';
import { child } from './-node/child';
import { expand } from './-node/expand';

export {
  editor,
  hide,
  lock,
  expand,
  warnings,
  reference,
  child,
  doc,
  data
};

export default class Node extends Model {

  @service store;
  nodes;

  referenceKeys = [];

  @activate() doc;

  @doc('id') id;
  @data('type') type;
  @data('index') index;
  @data('identifier') identifier;
  @data('parent') parentId;

  @scheduleSave _scheduleSave;

  constructor(owner, { doc, nodes }) {
    super(owner);
    this.doc = doc;
    this.nodes = nodes;
  }

  //

  get selected() {
    return this.nodes.selected === this;
  }

  get editable() {
    return !this.nodes.isBusy && (!this.lock || !this.lock.locked);
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

  get isFirst() {
    return firstObject(this.parentChildren) === this;
  }

  get isLast() {
    return lastObject(this.parentChildren) === this;
  }

  //

  get parent() {
    let { nodes, parentId } = this;
    if(!parentId) {
      return null;
    }
    return nodes.all.find(node => node.id === parentId) || null;
  }

  get children() {
    return sortedBy(this.nodes.all.filter(node => node.parent === this), 'index');
  }

  get hasChildren() {
    return this.children.length > 0;
  }

  //

  async save() {
    await this.doc.save({ token: true });
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

  update(props, schedule=true) {
    Object.assign(this.doc.data, this._normalizeReferences(props));
    if(schedule) {
      this._scheduleSave.schedule();
    }
  }

  async delete() {
    this._scheduleSave.cancel();
    await this.doc.delete();
  }

  //

  async reorderParentChildren() {
    sortedBy(this.parentChildren, 'index').forEach((model, index) => model.update({ index }));
  }

  didMove() {}

  async moveUp() {
    let another = prevObject(this.parentChildren, this);
    if(!another) {
      return;
    }
    let index = this.index;
    this.update({ index: another.index });
    another.update({ index: index });
    this.reorderParentChildren();
    this.didMove();
  }

  async moveDown() {
    let another = nextObject(this.parentChildren, this);
    if(!another) {
      return;
    }
    let index = this.index;
    this.update({ index: another.index });
    another.update({ index: index });
    this.reorderParentChildren();
    this.didMove();
  }

  //

  async _createNode(props, opts) {
    this.expand?.expand();
    return this.nodes._createNode(this, props, opts);
  }

  //

  didDeselect() {}
  didSelect() {}

  //

  onKeyLeft() {}
  onKeyRight() {}

  //

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
