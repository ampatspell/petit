import { removeObjects } from 'petit/util/array';

class Colors {

  constructor(node, opts) {
    this.node = node;
    this.opts = opts;
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

  _hashFor(key, value) {
    let { data } = this;
    return data.find(hash => hash[key] === value);
  }

  _hashForColor(color) {
    let { identifier } = color;
    return this._hashFor('identifier', identifier);
  }

  _addHash(hash) {
    this.data.push(hash);
    this.node.scheduleSave.schedule();
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

  replaceColor(value, color) {
    let hash = this.data.find(hash => hash.value === value);
    if(!hash) {
      return;
    }
    hash.identifier = color.identifier;
    this.node.scheduleSave.schedule();
  }

  get missing() {
    return this.mapped?.filter(hash => !hash.color);
  }

  get used() {
    return this.node[this.opts.used];
  }

  get unused() {
    let { data, used } = this;
    return data.filter(hash => !used.includes(hash.value));
  }

  compact() {
    let { data, unused } = this;
    removeObjects(data, unused);
    this.node.scheduleSave.schedule();
  }

}

export const colors = (node, opts) => {
  node.colors = new Colors(node, opts);
}
