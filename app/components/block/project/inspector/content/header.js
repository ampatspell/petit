import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentHeaderComponent extends Component {

  @action
  toggleLocked() {
    this.args.model.lock.toggle();
  }

  @action
  toggleHidden() {
    this.args.model.hide.toggle();
  }

}
