import Model, { doc, data } from './-model';
import { activate } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { model } from 'zuglet/decorators';
import ScheduleSave from '../util/schedule-save';
import { reads } from "macro-decorators";

class ProjectNodesDelegate {

  constructor(project) {
    this._project = project;
  }

  @reads('_project.locked') locked;

}

export default class Project extends Model {

  type = 'project';
  typeName = 'Project';

  @activate() doc;

  @doc('id') id;
  @data('title') title;
  @data('createdAt') createdAt;
  @data('locked') locked;
  @reads('locked') selfLocked;

  @model()
    .named('project/nodes')
    .mapping(project => ({
      projectId: project.id,
      delegate: new ProjectNodesDelegate(project)
    }))
  nodes

  _scheduleSave = new ScheduleSave(this);

  get editable() {
    return !this.nodes.isBusy && !this.locked;
  }

  constructor(owner, { doc }) {
    super(owner);
    this.doc = doc;
    setGlobal({ project: this });
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
