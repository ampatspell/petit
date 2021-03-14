import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { reads } from "macro-decorators";

class Shared {

  @tracked open = false;

}

let shared = new Shared();

export default class BlockProjectInspectorContentInversesComponent extends Component {

  shared = shared;

  @reads('args.model.dependencies.inverses') inverses;
  @reads('inverses.length') count;

  get openable() {
    return this.count > 0;
  }

  get open() {
    return shared.open && this.count > 0;
  }

  @action
  toggle() {
    shared.open = !shared.open;
  }

  get label() {
    let { count } = this;
    if(count === 0) {
      return 'Unused';
    }
    if(count === 1) {
      return `Used by ${count} node`;
    }
    return `Used by ${count} nodes`;
  }

  @action
  onFollow(node) {
    node.nodes.select(node, { expandParents: true });
  }

}
