import BaseNode from './-base-node';
import { activate } from 'zuglet/decorators';
import { doc, data } from './-node/doc';
import { scheduleSave } from '../../../util/schedule-save';
import { sortedBy } from '../../../util/array';
import { cached } from "tracked-toolbox";

export default class Node extends BaseNode {

  @activate() doc;

  @doc('id') id;
  @doc('exists') exists;
  @data('type') type;
  @data('index') index;
  @data('identifier') identifier;
  @data('parent') parentId;

  @scheduleSave scheduleSave;

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
      this.scheduleSave.schedule();
    }
  }

  async delete() {
    this.scheduleSave.cancel();
    await this.doc.delete();
  }

  //

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
