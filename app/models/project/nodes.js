import Model from '../-model';
import { inject as service } from "@ember/service";
import { activate, models } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { tracked } from "@glimmer/tracking";

const {
  assign
} = Object;

export default class Nodes extends Model {

  @service store;

  @tracked isBusy = false;

  projectId = null;

  get collection() {
    let { store, projectId } = this;
    return store.refs.nodes.collection(projectId);
  }

  @activate()
    .content(({ collection }) => collection.query())
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

  //

  async _createNode(props) {
    this.isBusy = true;
    try {
      let doc = this.collection.doc().new(assign({ createdAt: this.store.serverTimestamp }, props));
      this.query.register(doc);
      await doc.save();
      let model = this.all.find(model => model.doc === doc);
      this.select(model);
      return model;
    } finally {
      this.isBusy = false;
    }
  }

  async createNewSprite() {
    return await this._createNode({
      type: 'sprite',
      identifier: 'untitled',
      parent: null,
      version: 1
    });
  }

  async createNewScene() {
    return await this._createNode({
      type: 'scene',
      identifier: 'untitled',
      parent: null,
      version: 1
    });
  }

}
