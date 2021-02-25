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
  @reads('_project.doc.data.selected') initialSelection;

  didSelectNode(node) {
    this._project.nodesDidSelectNode(node);
  }

}

export default class Project extends Model {

  type = 'project';
  typeName = 'Project';

  isProject = true;

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
    await this.doc.save({ token: true });
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

  nodesDidSelectNode(node) {
    let selected = node?.id || null;
    this.update({ selected });
  }

  //

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
