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
    let visible = arr => arr.filter(node => node.hide && !node.hide.hidden);
    return visible(this.root).reverse();
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

  @reads('delegate.pixel')
  pixel

  @tracked
  isBusy = false;

  @exists()
  selected;

  //

  select(node, opts) {
    let { expandParents } = assign({ expandParents: false }, opts);
    let { selected } = this;
    if(selected !== node) {
      this.selected = node;
      node && node.didSelect();
      selected && selected.didDeselect(node);
      this.delegate.didSelectNode(node);
      if(node && expandParents) {
        this.maybeExpandNodeParents(node);
      }
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
      curr.expand && curr.expand.maybe();
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
      identifier,
      index,
      editor: { x: 10, y: 20 },
      expanded: false,
      locked: false,
      hidden: false,
      pixel: 1,
      createdAt
    }, props);
  }

  async _createNode(parent, props, opts) {
    opts = assign({ select: true }, opts);
    this.isBusy = true;
    props = this._createNodeProperties(parent, props);
    try {
      let doc = this.collection.doc().new(props);
      this.query.register(doc);
      await doc.save();
      let model = this.all.find(model => model.doc === doc);
      if(opts.select) {
        this.select(model);
      }
      return model;
    } finally {
      this.isBusy = false;
    }
  }

  async createNewSprite() {
    let palette = this.all.find(node => node.type === 'palette' && node.identifier)?.identifier || null;

    let sprite = await this._createNode(null, {
      type: 'sprite',
      palette,
      width: 16,
      height: 16,
      version: 1
    });

    await sprite.createNewFrame({ select: false });

    return sprite;
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
        { r: 0,   g: 0,   b: 0,   a: 0   },
        { r: 0,   g: 0,   b: 0,   a: 255 },
        { r: 255, g: 255, b: 255, a: 255 }
      ],
      version: 1
    });
  }

  //

  async deleteOrphans() {
    let orphans = this.orphans;
    while(orphans.length > 0) {
      console.log('delete', orphans.length);
      await Promise.all(orphans.map(n => n.delete()));
      orphans = this.orphans;
    }
    console.log('done');
  }

}
