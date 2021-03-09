import { reads } from "macro-decorators";
import { consumeKey, dirtyKey } from 'zuglet/-private/model/tracking/tag';

const pos = (_target, key) => {
  return {
    get() {
      return this.pixel * this.doc.data[key];
    }
  }
}

const xy = [ 'x', 'y' ];

class Actions {

  _actions = [];

  constructor() {

  }

  get queued() {
    consumeKey(this, 'queued');
    return this._actions;
  }

  consume() {
    let { _actions: actions } = this;
    if(actions.length === 0) {
      return;
    }
    actions = [ ...actions ];
    this._actions = [];
    return actions;
  }

  add(name, opts) {
    this._actions = [ ...this._actions, { name, opts } ];
    dirtyKey(this, 'queued');
  }

  center() {
    this.add('center');
  }

}

class EditorProperties {

  @reads('node.doc') doc;
  @reads('node.nodes.pixel', 1) pixel;

  @pos x;
  @pos y;

  constructor(node) {
    this.node = node;
    this.actions = new Actions();
  }

  translate(props) {
    let { pixel } = this;
    let hash = {};
    xy.forEach(key => {
      let value = props[key];
      if(value !== undefined) {
        hash[key] = Math.round(value / pixel);
      }
    });
    return hash;
  }

  update(props) {
    props = this.translate(props);
    this.node.update(props);
  }

}

export const editor = node => {
  node.editor = new EditorProperties(node);
}
