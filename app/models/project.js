import Model, { doc, data } from './-model';
import { activate } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { model } from 'zuglet/decorators';
import { scheduleSave } from '../util/schedule-save';
import { reads } from "macro-decorators";
import { tools as _tools } from './project/node/-node/tools';

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' },
  { icon: 'arrows-alt',    type: 'project:drag' }
]);

class ProjectNodesDelegate {

  constructor(project) {
    this._project = project;
  }

  @reads('_project') defaultSelection;
  @reads('_project.lock.locked') locked;
  @reads('_project.doc.data.selected') initialSelection;
  @reads('_project.pixel') pixel;

  didSelectNode(node) {
    this._project.nodesDidSelectNode(node);
  }

}

class Lock {

  constructor(project) {
    this.project = project;
  }

  @reads('project.doc.data.locked') locked;
  @reads('locked') self;

  toggle() {
    this.project.update({ locked: !this.self });
  }

}

export default class Project extends Model {

  isProject = true;
  type = 'project';
  typeName = 'Project';
  group = this;

  @activate() doc;

  @doc('id') id;
  @data('title') title;
  @data('createdAt') createdAt;
  @data('pixel') pixel;
  @data('overlays') overlays;
  @data('x') x;
  @data('y') y;

  @model()
    .named('project/nodes')
    .mapping(project => ({
      projectId: project.id,
      delegate: new ProjectNodesDelegate(project)
    }))
  nodes

  @scheduleSave _scheduleSave;

  get editable() {
    return !this.nodes.isBusy && !this.lock.locked;
  }

  constructor(owner, { doc }) {
    super(owner);
    this.doc = doc;
    this.lock = new Lock(this);
    tools(this);
  }

  //

  get selected() {
    return this.nodes.selected;
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

  didDeselect() {
    this.tools.reset();
  }

  //

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
