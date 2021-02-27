import { toString } from 'zuglet/utils';

class Reference {

  constructor(identifier, missing, model) {
    this.identifier = identifier;
    this.missing = missing;
    this.model = model;
  }

  toString() {
    return toString(this, `${this.identifier}`);
  }

}

export const reference = (type, identifierKey) => () => ({
  get() {
    let identifier = this[identifierKey];
    let model = null;
    let missing = false;
    if(identifier) {
      model = this.nodes.all.find(node => node.type === type && node.identifier === identifier);
      missing = !model;
    }
    return new Reference(identifier, missing, model);
  }
});
