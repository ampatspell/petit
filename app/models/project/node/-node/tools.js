import { tracked } from "@glimmer/tracking";

class Tools {

  @tracked _selected;

  constructor(node, tools) {
    this.node = node;
    this.all = tools || [];
    if(!this.findWith('type', 'drag')) {
      this.all.push({ icon: 'arrows-alt', type: 'drag', hidden: true });
    }
  }

  get _default() {
    return this.all[0];
  }

  //

  select(tool) {
    this._selected = tool;
  }

  reset() {
    this._selected = null;
  }

  get selected() {
    return this._selected || this._default;
  }

  findWith(key, value) {
    return this.all.find(tool => tool[key] === value)
  }

  selectWith(key, value) {
    this.select(this.findWith(key, value));
  }

  selectByType(type) {
    this.selectWith('type', type);
  }

}

export const tools = (node, tools) => {
  node.tools = new Tools(node, tools);
}
