
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

  get mapped() {
    let { palette, data } = this;
    if(!palette) {
      return null;
    }
    return data.map(({ identifier, value }) => {
      let color = palette.colorByIdentifier(identifier);
      return {
        value,
        identifier,
        color
      };
    });
  }

  _buildColorFunction(key) {
    let { mapped } = this;
    if(!mapped) {
      return null;
    }

    let pairs = {};
    mapped.forEach(({ value, color }) => {
      pairs[value] = color?.[key];
    });

    return value => pairs[value];
  }

  get rgba() {
    return this._buildColorFunction('rgba');
  }

  get canvas() {
    return this._buildColorFunction('canvas');
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
    return hash;
  }

  _registerColor(color) {
    let { identifier } = color;
    let value = this._nextInt();
    return this._addHash({ identifier, value });
  }

  valueForColor(color) {
    let hash = this._hashForColor(color);
    if(!hash) {
      hash = this._registerColor(color);
    }
    return hash.value;
  }

}

export const colors = (node, opts) => {
  node.colors = new Colors(node, opts);
}
