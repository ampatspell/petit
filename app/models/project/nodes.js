import Model from '../-model';
import { inject as service } from "@ember/service";
import { activate, models, model } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { tracked } from "@glimmer/tracking";
import { exists } from '../../util/exists';
import { reads } from "macro-decorators";
import { lastObject, sortedBy } from '../../util/array';

const {
  assign
} = Object;

export default class Nodes extends Model {

  @service store;
  projectId = null;
  delegate = null;

  constructor(owner, { projectId, delegate }) {
    super(owner);
    this.projectId = projectId;
    this.delegate = delegate;
  }

  //

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

  async load() {
    await load(this.query);
    this.maybeSelectInitialSelection();
  }

  //

  get root() {
    return sortedBy(this.all.filter(node => !node.parentId), 'index');
  }

  get visible() {
    return this.root.filter(node => !node.hidden);
  }

  get orphans() {
    return this.all.filter(node => node.parentId && !node.parent);
  }

  @model()
    .named('project/nodes/identified')
    .mapping(nodes => ({ nodes }))
  identified;

  //

  @reads('delegate.locked')
  locked;

  @tracked
  isBusy = false;

  @exists()
  selected;

  //

  select(node, opts) {
    let { expandParents } = assign({ expandParents: false }, opts);
    this.selected = node;
    this.delegate.didSelectNode(node);
    if(node && expandParents) {
      this.maybeExpandNodeParents(node);
    }
  }

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

  _createNodeProperties(parentNode, props) {
    let parent = parentNode?.id || null;

    let index = 0;
    let last = lastObject(parentNode ? parentNode.children : this.root);
    if(last) {
      index = last.index + 1;
    }

    let createdAt = this.store.serverTimestamp;

    let abbreviations = {
      'scene': 'sc',
      'scene/layer': null,
      'sprite': 'spr',
      'sprite/frame': null,
      'entity': 'ent',
      'palette': 'cp'
    };
    let abbr = abbreviations[props.type];
    let identifier = '';
    if(abbr) {
      identifier = `${abbr}_${index}`;
    }

    return assign({
      parent,
      index,
      expanded: false,
      locked: false,
      hidden: false,
      identifier,
      createdAt
    }, props);
  }

  async _createNode(parent, props) {
    this.isBusy = true;
    props = this._createNodeProperties(parent, props);
    try {
      let doc = this.collection.doc().new(props);
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
    return await this._createNode(null, {
      type: 'sprite',
      version: 1
    });
  }

  async createNewScene() {
    return await this._createNode(null, {
      type: 'scene',
      version: 1
    });
  }

  async createNewPalette() {
    return await this._createNode(null, {
      type: 'palette',
      colors: [
        { r: 0, g: 0, b: 0, a: 0 },
        { r: 0, g: 0, b: 0, a: 1 },
        { r: 255, g: 255, b: 255, a: 1 }
      ],
      version: 1
    });
  }

  //

  async deleteOrphans() {
    let orphans = this.orphans;
    while(orphans.length > 0) {
      console.log('delete', orphans.length);
      await orphans.map(n => n.delete());
      orphans = this.orphans;
    }
    console.log('done');
  }

}
