import { tracked } from "@glimmer/tracking";

let INSTANCES = new WeakMap();

class Existing {

  @tracked model;

  docKey = null;

  constructor(def) {
    this.docKey = def;
  }

  get value() {
    let model = this.model;
    if(model && model[this.docKey].exists) {
      return model;
    }
    return null;
  }

  set value(value) {
    this.model = value;
  }

}

const getInstance = (target, key, def) => {
  let instances = INSTANCES.get(target);
  if(!instances) {
    instances = {};
    INSTANCES.set(target, instances);
  }
  let instance = instances[key];
  if(!instance) {
    instance = new Existing(def);
    instances[key] = instance;
  }
  return instance;
}

export const existing = (def='doc') => (_target, key) => {
  return {
    get() {
      return getInstance(this, key, def).value;
    },
    set(value) {
      getInstance(this, key, def).value = value;
      return value;
    }
  };
}
