import { tracked } from "@glimmer/tracking";

class Tools {

  @tracked __selected;

  constructor(node, tools) {
    this.node = node;
    this.all = tools;
  }

  get _default() {
    return this.all[0];
  }

  get _selected() {
    return this.__selected || this._default;
  }

  select(tool) {
    this.__selected = tool;
  }

  reset() {
    this.__selected = null;
  }

  get selected() {
    return this.node.selected ? this._selected : this._default;
  }

  selectWith(key, value) {
    this.select(this.all.find(tool => tool[key] === value));
  }

  selectByType(type) {
    this.selectWith('type', type);
  }

}

export const tools = (node, tools) => {
  node.tools = new Tools(node, tools);
}
