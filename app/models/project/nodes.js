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
    .named(doc => `project/node/${doc.data.type}`)
    .mapping((doc, nodes) => ({ doc, nodes }))
  all;

  get root() {
    return this.all.filter(node => !node.parent);
  }

  constructor(owner, { projectId }) {
    super(owner);
    this.projectId = projectId;
  }

  async load() {
    load(this.query);
  }

  //

  @tracked _selected = null;

  get selected() {
    let selected = this._selected;
    if(selected && selected.doc.exists) {
      return selected;
    }
    return null;
  }

  select(node) {
    this._selected = node;
  }

}
