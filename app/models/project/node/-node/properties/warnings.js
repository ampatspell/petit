import { reads } from "macro-decorators";

export class Warning {

  @reads('warnings.node') node;

  constructor(warnings) {
    this.warnings = warnings;
  }

}

export class GlobalIdentifierConflict extends Warning {

  get description() {
    return `Global identifier conflict`;
  }

  get has() {
    let { node, node: { identifier, nodes } } = this;
    if(!identifier) {
      return false;
    }
    let another = nodes.all.find(another => another !== node && another.identifier === identifier);
    return !!another;
  }

}

export class MissingReferences extends Warning {

  get description() {
    return `Missing references`;
  }

  get has() {
    let { node } = this;
    return !!node.referenceKeys.find(key => {
      let ref = node[key];
      return ref.missing === true || ref.model === null;
    });
  }

}

const defaults = [
  GlobalIdentifierConflict,
  MissingReferences
];

const normalizeOpts = (opts={}) => {
  let types = defaults;
  if(opts.add) {
    types = [ ...types, ...opts.add ];
  } else if(opts.replace) {
    types = opts.replace;
  }
  return {
    types
  };
}

class Warnings {

  constructor(node, opts) {
    opts = normalizeOpts(opts);
    this.node = node;
    this.warnings = opts.types.map(type => new type(this));
  }

  get enabled() {
    return this.warnings.filter(warning => warning.has);
  }

  get any() {
    return this.enabled.length > 0;
  }

}

// opts: { add: [], replace: [] }
export const warnings = (node, opts) => {
  node.warnings = new Warnings(node, opts);
}
