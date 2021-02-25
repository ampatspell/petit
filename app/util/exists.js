import { tracked } from "@glimmer/tracking";
import { getInstance } from './instances';

class Exists {

  @tracked model;

  doc = null;

  constructor(doc) {
    this.doc = doc;
  }

  get value() {
    let model = this.model;
    if(model && model[this.doc].exists) {
      return model;
    }
    return null;
  }

  set value(value) {
    this.model = value;
  }

}

const getExists = (target, key, doc) => getInstance(target, key, () => new Exists(doc));

export const exists = (doc='doc') => (_target, key) => {
  return {
    get() {
      return getExists(this, key, doc).value;
    },
    set(value) {
      getExists(this, key, doc).value = value;
      return value;
    }
  };
}
