import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectTreeIndexComponent extends Component {

  @action
  onSelect(node) {
    this.args.nodes.select(node);
  }

}
