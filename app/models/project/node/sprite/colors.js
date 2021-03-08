
class Colors {

  constructor(node, opts) {
    this.node = node;
    this.opts = opts;
    if(!this.data) {
      node.update({ [this.opts.key]: [] });
    }
  }

  get palette() {
    return this.node[this.opts.palette]?.model;
  }

  get data() {
    return this.node.doc.data[this.opts.key];
  }

  _nextInt() {
    let { data } = this;
    let value = 0;
    // eslint-disable-next-line no-constant-condition
    while(true) {
      if(!data.find(item => item.value === value)) {
        return value;
      } else {
        value++;
      }
    }
  }

  _hashForColor(color) {
    let { identifier } = color;
    let { data } = this;
    return data.find(hash => hash.identifier === identifier);
  }

  _addHash(hash) {
    this.data.push(hash);
    this.node._scheduleSave.schedule();
  }

  register(color) {
    if(this._hashForColor(color)) {
      return;
    }
    let { identifier } = color;
    let value = this._nextInt();
    this._addHash({ identifier, value });
  }

}

export const colors = (node, opts) => {
  node.colors = new Colors(node, opts);
}
