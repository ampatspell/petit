import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentReorderComponent extends Component {

  @action
  moveUp() {
    this.args.model.move.up();
  }

  @action
  moveDown() {
    this.args.model.move.down();
  }

}
