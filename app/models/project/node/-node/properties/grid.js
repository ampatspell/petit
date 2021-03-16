import { cached } from "tracked-toolbox";
import { pick } from 'petit/util/object';

const {
  assign
} = Object;

const data = (_target, key) => ({
  get() {
    return this.data[key];
  }
});

class Grid {

  constructor(node, opts) {
    this.node = node;
    this.opts = opts;
  }

  @cached
  get data() {
    return this.node.doc.data[this.opts.key];
  }

  _set(props) {
    assign(this.node.doc.data[this.opts.key], props);
    this.node.scheduleSave.schedule();
  }

  @data enabled;
  @data x;
  @data y;

  update(props) {
    if(props) {
      props = assign(pick(this, [ 'x', 'y', 'enabled' ]), props);
    }
    this._set(props || null);
  }

  get snapping() {
    let { enabled, x, y } = this;
    if(!enabled) {
      x = 1;
      y = 1;
    }
    return {
      x,
      y
    };
  }

}

export const grid = (node, opts) => {
  opts = assign({ key: 'grid' }, opts);
  node.grid = new Grid(node, opts);
}

