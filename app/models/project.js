import Model, { doc, data } from './-model';
import { activate } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { model } from 'zuglet/decorators';
import ScheduleSave from '../util/schedule-save';

export default class Project extends Model {

  type = 'project';

  @activate() doc;

  @doc('id') id;
  @data('title') title;
  @data('createdAt') createdAt;
  @data('locked') locked;

  @model()
    .named('project/nodes')
    .mapping(({ id: projectId }) => ({ projectId }))
  nodes

  _scheduleSave = new ScheduleSave(this);

  get editable() {
    return !this.nodes.isBusy && !this.locked;
  }

  constructor(owner, { doc }) {
    super(owner);
    this.doc = doc;
  }

  //

  get group() {
    return this;
  }

  get selected() {
    return this.nodes.selected || this;
  }

  //

  async load() {
    let { doc } = this;
    await load(doc);
    await this.nodes.load();
  }

  async save() {
    await this.doc.save();
  }

  async delete() {
    this._scheduleSave.cancel();
    await this.doc.delete();
  }

  //

  update(props) {
    Object.assign(this.doc.data, props);
    this._scheduleSave.schedule();
  }

  //

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
