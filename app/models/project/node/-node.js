import Model, { doc, data } from '../../-model';
import { activate } from 'zuglet/decorators';
import { scheduleSave } from '../../../util/schedule-save';
import { firstObject, lastObject, sortedBy } from '../../../util/array';
import { inject as service } from "@ember/service";
import { editor } from './-node/editor';
import { lock } from './-node/lock';
import { hide } from './-node/hide';
import { warnings } from './-node/warnings';
import { reference } from './-node/reference';
import { child } from './-node/child';
import { expand } from './-node/expand';
import { pixel } from './-node/pixel';
import { tools } from './-node/tools';
import { editable } from './-node/editable';
import { move } from './-node/move';
import { actions } from './-node/actions';
import { color } from './-node/color';
import { cached } from "tracked-toolbox";

export {
  editor,
  editable,
  hide,
  lock,
  expand,
  warnings,
  reference,
  actions,
  pixel,
  tools,
  child,
  color,
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

  get visibleChildren() {
    let visible = arr => arr.filter(node => !node.hide || !node.hide.hidden);
    return visible(this.children).reverse();
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

  async _createNode(props, opts) {
    this.expand?.expand();
    return this.nodes._createNode(this, props, opts);
  }

  //

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
