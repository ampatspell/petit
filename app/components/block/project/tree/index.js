import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectTreeIndexComponent extends Component {

  @action
  onSelect(node) {
    let { nodes } = this.args;
    if(node && nodes.selected === node) {
      node.expand && node.expand.maybeToggle();
    } else {
      nodes.select(node);
    }
  }

}
