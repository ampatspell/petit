import Model, { doc, data } from '../../-model';
import { activate } from 'zuglet/decorators';
import ScheduleSave from '../../../util/schedule-save';
import { firstObject, lastObject, sortedBy, prevObject, nextObject } from '../../../util/array';
import { inject as service } from "@ember/service";

export {
  doc,
  data
};

export default class Node extends Model {
  @service store;

  nodes;

  @activate() doc;

  @doc('id') id;
  @data('type') type;
  @data('index') index;
  @data('identifier') identifier;
  @data('parent') parentId;
  @data('locked') _locked;
  @data('expanded') expanded;

  _scheduleSave = new ScheduleSave(this);

  constructor(owner, { doc, nodes }) {
    super(owner);
    this.doc = doc;
    this.nodes = nodes;
  }

  //

  get locked() {
    return this._locked || this.parent?.locked || this.nodes.locked;
  }

  get parentLocked() {
    return this.locked && !this._locked;
  }

  get selfLocked() {
    return this._locked;
  }

  get selected() {
    return this.nodes.selected === this;
  }

  get editable() {
    return !this.nodes.isBusy && !this.locked;
  }

  get parentChildren() {
    let { parent } = this;
    return parent ? parent.children : this.nodes.root;
  }

  get isFirst() {
    return firstObject(this.parentChildren) === this;
  }

  get isLast() {
    return lastObject(this.parentChildren) === this;
  }

  get hasIdentifierConflict() {
    let { identifier } = this;
    if(!identifier) {
      return false;
    }
    let another = this.nodes.all.find(node => node !== this && node.identifier === identifier);
    return !!another;
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

  update(props) {
    Object.assign(this.doc.data, props);
    this._scheduleSave.schedule();
  }

  async delete() {
    this._scheduleSave.cancel();
    await this.doc.delete();
  }

  //

  maybeExpand() {
    let { expanded, hasChildren } = this;
    if(expanded || !hasChildren) {
      return;
    }
    this.update({ expanded: true });
  }

  maybeToggleExpanded() {
    let { expanded, hasChildren } = this;
    if(!hasChildren) {
      return;
    }
    this.update({ expanded: !expanded });
  }

  //

  async reorderParentChildren() {
    sortedBy(this.parentChildren, 'index').forEach((model, index) => model.update({ index }));
  }

  async moveUp() {
    let another = prevObject(this.parentChildren, this);
    if(!another) {
      return;
    }
    let index = this.index;
    this.update({ index: another.index });
    another.update({ index: index });
    this.reorderParentChildren();
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
  }

  //

  async _createNode(props) {
    this.update({ expanded: true });
    return this.nodes._createNode(this, props);
  }

  //

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
