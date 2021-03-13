import { toString } from 'zuglet/utils';
import { getInstance } from 'petit/util/instances';
import { cached } from "tracked-toolbox";

class Reference {

  isReference = true;

  constructor(target, key, opts) {
    this.node = target;
    this.key = key;
    this.opts = opts;
  }

  get identifier() {
    return this.node[this.opts.identifier];
  }

  @cached
  get model() {
    let { node, opts: { type }, identifier } = this;
    if(!identifier) {
      return null;
    }
    return this.opts.lookup(node, type, identifier) || null;
  }

  get missing() {
    return this.identifier && !this.model;
  }

  toString() {
    return toString(this, `${this.opts.type}:${this.identifier}`);
  }

}

const getReference = (target, key, opts) => getInstance(target, key, () => new Reference(target, key, opts));

const defaultLookup = (node, type, identifier) => node.nodes.identified.byTypeAndIdentifier(type, identifier);

export const reference = (type, identifier, lookup=defaultLookup) => (_target, key) => ({
  get() {
    return getReference(this, key, { type, identifier, lookup });
  }
});
