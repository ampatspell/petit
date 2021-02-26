import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectEditorIndexComponent extends Component {

  @action
  didInsertContent(el) {
    this.contentElement = el;
  }

  @action
  onDeselect(e) {
    if(e.target !== this.contentElement) {
      return;
    }
    this.onSelect(null);
  }

  @action
  onSelect(node) {
    this.args.project.nodes.select(node);
  }

}
