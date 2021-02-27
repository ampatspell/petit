export const child = type => () => ({
  get() {
    return this.children.find(node => node.type === type);
  }
});
