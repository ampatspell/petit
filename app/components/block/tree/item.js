import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockTreeItemComponent extends Component {

  @action
  onClick(e) {
    e.stopPropagation();
    this.args.onClick && this.args.onClick(e);
  }

}
