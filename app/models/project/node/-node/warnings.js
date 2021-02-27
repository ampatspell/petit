import { or } from "macro-decorators";

class Warnings {

  constructor(node) {
    this.node = node;
  }

  get identifierConflict() {
    let { node, node: { identifier, nodes } } = this;
    if(!identifier) {
      return false;
    }
    let another = nodes.all.find(another => another !== node && another.identifier === identifier);
    return !!another;
  }

  get missingReferences() {
    let { node } = this;
    return !!node.referenceKeys.find(key => {
      let ref = node[key];
      return ref.missing === true || ref.model === null;
    });
  }

  @or('identifierConflict', 'missingReferences') any;

}

export const warnings = node => {
  node.warnings = new Warnings(node);
}
