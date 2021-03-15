import Model from '../-model';
import { inject as service } from "@ember/service";
import { activate, models, model } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { tracked } from "@glimmer/tracking";
import { reads } from "macro-decorators";
import { lastObject, sortedBy } from '../../util/array';
import { selection } from './nodes/selection';
import { cached } from "tracked-toolbox";
import { randomString } from '../../util/string';

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
    selection(this);
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
  models;

  @cached
  get all() {
    return this.models.reduce((all, node) => [ ...all, ...node._all ], []);
  }

  async load() {
    await load(this.query);
    this.selection.maybeSelectInitial(this.delegate.initialSelection);
  }

  //

  @cached
  get root() {
    return sortedBy(this.all.filter(node => node.isRoot), 'index');
  }

  @cached
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

  //

  @reads('selection.selected') selected;

  select(node, opts) {
    this.selection.select(node, opts);
  }

  //

  createIdentifier(type) {
    let abbreviations = {
      'scene': 'sc',
      'scene/layer': 'sl',
      'sprite': 'spr',
      'sprite/frame': 'spf',
      'entity': 'ent',
      'palette': 'plt',
      'palette/color': 'clr',
      'sequence': 'seq',
      'sequence/frame': 'sef',
      'entity/sprite-frame': 'ent',
      'entity/sequence': 'ent'
    };
    let abbr = abbreviations[type];
    let identifier = '';
    if(abbr) {
      let id = randomString(5);
      identifier = `${abbr}_${id}`;
    }
    return identifier;
  }

  _createNodeProperties(parentNode, props) {
    let parent = parentNode?.id || null;

    let index = 0;
    let last = lastObject(parentNode ? parentNode.children : this.root);
    if(last) {
      index = last.index + 1;
    }

    let createdAt = this.store.serverTimestamp;
    let identifier = this.createIdentifier(props.type);

    return assign({
      parent,
      identifier,
      index,
      x: 10,
      y: 10,
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

  _newSpriteProperties() {
    let palette = this.identified.palette[0] || null;
    let colors = [];

    let color = value => {
      let identifier = palette?.identifiedColors[value]?.identifier;
      identifier && colors.push({ identifier, value });
    }
    color(0);
    color(1);
    color(2);

    return {
      width: 16,
      height: 16,
      palette: palette?.identifier || null,
      colors
    };
  }

  async createNewSprite() {
    let props = this._newSpriteProperties();
    let sprite = await this._createNode(null, {
      type: 'sprite',
      version: 1,
      ...props
    });

    await sprite.createNewFrame({ select: false });

    return sprite;
  }

  async createNewScene() {
    return await this._createNode(null, {
      type: 'scene',
      width: 120,
      height: 64,
      version: 1
    });
  }

  async createNewPalette() {
    let id = () => this.createIdentifier('palette/color');
    return await this._createNode(null, {
      type: 'palette',
      colors: [
        { index: 0, identifier: id(), r: 0,   g: 0,   b: 0,   a: 0   },
        { index: 1, identifier: id(), r: 0,   g: 0,   b: 0,   a: 255 },
        { index: 2, identifier: id(), r: 255, g: 255, b: 255, a: 255 }
      ],
      version: 1
    });
  }

  async createNewSequence() {
    let sprites = sortedBy(this.identified.sprite, node => node.frames.length).reverse();
    let sprite = sprites[0];

    let frames = [];
    if(sprite) {
      frames = sprite.frames.filter(frame => frame.identifier).map((frame, index) => {
        return {
          index,
          identifier: this.createIdentifier('sequence/frame'),
          frame: frame.identifier,
          framerate: 5
        };
      });
    }

    return await this._createNode(null, {
      type: 'sequence',
      sprite: sprite?.identifier || null,
      frames,
      vesion: 1
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
