import { addObject, removeObject } from 'petit/util/array';

class Actions {

  registered = Object.create(null);

  constructor(node) {
    this.node = node;
  }

  actionsFor(name, create=false) {
    let arr = this.registered[name];
    if(!arr && create) {
      arr = [];
      this.registered[name] = arr;
    }
    return arr;
  }

  register(name, cb) {
    let hash = { cb };
    addObject(this.actionsFor(name, true), hash);
    return () => {
      removeObject(this.actionsFor(name), hash);
    };
  }

  invoke(name, ...args) {
    let actions = this.actionsFor(name, false);
    if(actions) {
      [ ...actions ].forEach(({ cb }) => cb(...args));
    }
  }

}

export const actions = node => {
  node.actions = new Actions(node);
}
