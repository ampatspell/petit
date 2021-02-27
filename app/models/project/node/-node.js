import Model, { doc, data } from '../../-model';
import { activate } from 'zuglet/decorators';
import { scheduleSave } from '../../../util/schedule-save';
import { firstObject, lastObject, sortedBy, prevObject, nextObject } from '../../../util/array';
import { inject as service } from "@ember/service";
import { or } from "macro-decorators";
import { reads } from "macro-decorators";

const {
  assign
} = Object;

export {
  doc,
  data
};

export const child = type => () => ({
  get() {
    return this.children.find(node => node.type === type);
  }
});

export const reference = (type, identifierKey) => () => ({
  get() {
    let identifier = this[identifierKey];
    let model = null;
    let missing = false;
    if(identifier) {
      model = this.nodes.all.find(node => node.type === type && node.identifier === identifier);
      missing = !model;
    }
    return {
      identifier,
      missing,
      model
    };
  }
});

class EditorProperties {

  @reads('node._editor') data;

  @reads('data.x') x;
  @reads('data.y') y;

  constructor(node) {
    this.node = node;
  }

  update(props) {
    assign(this.data, props);
    this.node._scheduleSave.schedule();
  }

}

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
  @data('locked') _locked;
  @data('hidden') _hidden;
  @data('expanded') expanded;
  @data('editor') _editor;

  @scheduleSave _scheduleSave;

  constructor(owner, { doc, nodes }) {
    super(owner);
    this.doc = doc;
    this.nodes = nodes;
    this.editor = new EditorProperties(this);
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

  //

  get hidden() {
    return this._hidden || this.parent?.hidden;
  }

  get parentHidden() {
    return this.hidden && !this._hidden;
  }

  get selfHidden() {
    return this._hidden;
  }

  //

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

  get tree() {
    return {
      expandable: this.hasChildren,
      lockable: true,
      hideable: true,
    };
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

  get hasIdentifierConflict() {
    let { identifier } = this;
    if(!identifier) {
      return false;
    }
    let another = this.nodes.all.find(node => node !== this && node.identifier === identifier);
    return !!another;
  }

  get hasMissingReferences() {
    return !!this.referenceKeys.find(key => this[key].missing === true);
  }

  @or('hasIdentifierConflict', 'hasMissingReferences') hasWarnings;

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
