import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectEditorIndexComponent extends Component {

  @action
  onSelect(node) {
    this.args.project.nodes.select(node);
  }

}
