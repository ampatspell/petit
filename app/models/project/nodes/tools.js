import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";

class Tools {

  constructor(nodes) {
    this.nodes = nodes;
  }

  @reads('nodes.selection.selected.group') _group;
  @tracked _selected;

  selected(node) {
    let selected = this._selected;
    if(selected && selected.node === node && this._group === node) {
      return selected.tool;
    }
  }

  select(node, tool) {
    this._selected = { node, tool };
  }

}

export const tools = nodes => {
  nodes.tools = new Tools(nodes);
}
