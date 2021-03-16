import { cached } from "tracked-toolbox";

const {
  assign
} = Object;

const data = (_target, key) => ({
  get() {
    return this.data?.[key] ?? null;
  }
});

class Grid {

  constructor(node, opts) {
    this.node = node;
    this.opts = opts;
  }

  @cached
  get data() {
    return this.node.doc[this.opts.key] || null;
  }

  get enabled() {
    return !!this.data;
  }

  @data x;
  @data y;

  update(props) {
    this.node.doc[this.opts.key] = props || null;
    this.node.scheduleSave.schedule();
  }

}

export const grid = (node, opts) => {
  opts = assign({ key: 'grid' }, opts);
  node.grid = new Grid(node, opts);
}

