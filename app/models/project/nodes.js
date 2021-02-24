import Model from '../-model';
import { inject as service } from "@ember/service";
import { activate, models } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { tracked } from "@glimmer/tracking";
import { existing } from '../../util/existing';
import { reads } from "macro-decorators";

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
    return this.all.filter(node => !node.parentId);
  }

  constructor(owner, { projectId, delegate }) {
    super(owner);
    this.projectId = projectId;
    this.delegate = delegate;
  }

  async load() {
    await load(this.query);
    this.maybeSelectInitialSelection();
  }

  //

  @reads('delegate.locked') locked;

  //

  @existing() selected;

  select(node, opts) {
    let { expandParents } = assign({ expandParents: false }, opts);
    this.selected = node;
    this.delegate.didSelectNode(node);
    if(node && expandParents) {
      this.maybeExpandNodeParents(node);
    }
  }

  //

  maybeSelectInitialSelection() {
    let id = this.delegate.initialSelection;
    if(id) {
      let node = this.all.find(node => node.id === id);
      if(node) {
        this.select(node, { expandParents: true });
      }
    }
  }

  maybeExpandNodeParents(node) {
    let curr = node.parent;
    while(curr) {
      curr.maybeExpand();
      curr = curr.parent;
    }
  }

  //

  async _createNode(props) {
    this.isBusy = true;
    try {
      let doc = this.collection.doc().new(assign({
        expanded: false,
        createdAt: this.store.serverTimestamp
      }, props));
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
