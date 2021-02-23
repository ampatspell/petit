import Model, { doc, data } from '../../-model';
import { activate } from 'zuglet/decorators';
import ScheduleSave from '../../../util/schedule-save';

export default class Node extends Model {

  nodes;

  @activate() doc;

  @doc('id') id;
  @data('type') type;
  @data('identifier') identifier;
  @data('parent') parentId;

  _scheduleSave = new ScheduleSave(this);

  constructor(owner, { doc, nodes }) {
    super(owner);
    this.doc = doc;
    this.nodes = nodes;
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

  get isSelected() {
    return this.nodes.selected === this;
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

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
