import Model from '../-model';
import { inject as service } from "@ember/service";
import { activate, models } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { tracked } from "@glimmer/tracking";

export default class Nodes extends Model {

  @service store;

  projectId = null;

  @activate()
    .content(({ store, projectId }) => store.refs.nodes.collection(projectId).query())
  query;

  @models()
    .source(({ query }) => query.content)
    .named('project/node')
    .mapping((doc, nodes) => ({ doc, nodes }))
  all;

  @tracked selected = null;

  get root() {
    return this.all.filter(node => !node.parent);
  }

  constructor(owner, { projectId }) {
    super(owner);
    this.projectId = projectId;
  }

  select(node) {
    this.selected = node;
  }

  async load() {
    load(this.query);
  }

}
