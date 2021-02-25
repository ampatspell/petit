import { tracked } from "@glimmer/tracking";
import { getInstance } from './instances';

class Existing {

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

const getExisting = (target, key, doc) => getInstance(target, key, () => new Existing(doc));

export const existing = (doc='doc') => (_target, key) => {
  return {
    get() {
      return getExisting(this, key, doc).value;
    },
    set(value) {
      getExisting(this, key, doc).value = value;
      return value;
    }
  };
}
