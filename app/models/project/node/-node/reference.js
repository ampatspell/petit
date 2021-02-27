export const reference = (type, identifierKey) => () => ({
  get() {
    let identifier = this[identifierKey];
    let model = null;
    let missing = false;
    if(identifier) {
      model = this.nodes.all.find(node => node.type === type && node.identifier === identifier);
      missing = !model;
    }
    return {
      identifier,
      missing,
      model
    };
  }
});
