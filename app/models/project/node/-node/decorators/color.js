import { getInstance } from 'petit/util/instances';

const {
  assign
} = Object;

class ColorReference {

  constructor(node, opts) {
    this._node = node;
    this._opts = opts;
  }

  get palette() {
    let { _node, _opts: { palette } } = this;
    return _node[palette]?.model;
  }

  get identifier() {
    let { _node: { doc }, _opts: { key } } = this;
    return doc.data[key];
  }

  get missing() {
    return this.identifier && !this.model;
  }

  get model() {
    let { identifier } = this;
    if(!identifier) {
      return null;
    }
    return this.palette?.colorByIdentifier(identifier);
  }

  set(color) {
    let { _node, _opts: { key } } = this;
    _node.update({ [key]: color });
  }

}

const getReference = (target, key, opts) => getInstance(target, key, () => new ColorReference(target, assign({ key }, opts)));

//
// referenceKeys = [ 'palette', 'background' ];
// @reference('palette', '_palette') palette;
// @color('palette') background;
//
export const color = palette => {
  let opts = { palette };
  return (_target, key) => {
    return {
      get() {
        return getReference(this, key, opts);
      },
      set(value) {
        return getReference(this, key, opts).set(value);
      }
    }
  }
}
