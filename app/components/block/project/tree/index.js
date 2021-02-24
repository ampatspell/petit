import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectTreeIndexComponent extends Component {

  @action
  onSelect(node) {
    let { nodes } = this.args;
    if(node && nodes.selected === node) {
      node.maybeToggleExpanded();
    } else {
      nodes.select(node);
    }
  }

  @action
  onUpdate(node, props) {
    node.update(props);
  }

}
