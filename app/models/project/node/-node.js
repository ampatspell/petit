import BaseNode, { doc, data } from './-base-node';
import { activate } from 'zuglet/decorators';
import { scheduleSave } from '../../../util/schedule-save';
import { sortedBy } from '../../../util/array';
import { editor } from './-node/editor';
import { lock } from './-node/lock';
import { hide } from './-node/hide';
import { reference } from './-node/reference';
import { child } from './-node/child';
import { expand } from './-node/expand';
import { pixel } from './-node/pixel';
import { tools } from './-node/tools';
import { editable } from './-node/editable';
import { actions } from './-node/actions';
import { color } from './-node/color';
import { cached } from "tracked-toolbox";

export {
  editor,
  editable,
  hide,
  lock,
  expand,
  reference,
  actions,
  pixel,
  tools,
  child,
  color,
  doc,
  data
};

export default class Node extends BaseNode {

  @activate() doc;

  @doc('id') id;
  @doc('exists') exists;
  @data('type') type;
  @data('index') index;
  @data('identifier') identifier;
  @data('parent') parentId;

  @scheduleSave _scheduleSave;

  constructor(owner, { doc, nodes }) {
    super(owner, { nodes });
    this.doc = doc;
  }

  //

  @cached
  get parent() {
    let { nodes, parentId } = this;
    if(!parentId) {
      return null;
    }
    return nodes.all.find(node => node.id === parentId) || null;
  }

  @cached
  get children() {
    return sortedBy(this.nodes.all.filter(node => node.parent === this), 'index');
  }

  //

  async save() {
    await this.doc.save({ token: true });
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

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
