import Model, { doc, data } from '../../-model';
import { activate } from 'zuglet/decorators';
import ScheduleSave from '../../../util/schedule-save';

const {
  assign
} = Object;

export default class Node extends Model {

  nodes;

  @activate() doc;

  @doc('id') id;
  @data('type') type;
  @data('identifier') identifier;
  @data('parent') parentId;
  @data('locked') _locked;

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

  //

  get parent() {
    let { nodes, parentId } = this;
    if(!parentId) {
      return null;
    }
    return nodes.all.find(node => node.id === parentId) || null;
  }

  get children() {
    return this.nodes.all.filter(node => node.parent === this);
  }

  get hasChildren() {
    return this.children.length > 0;
  }

  //

  async save() {
    await this.doc.save();
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

  async _createNode(props) {
    return this.nodes._createNode(assign({
      parent: this.id
    }, props));
  }

  //

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
