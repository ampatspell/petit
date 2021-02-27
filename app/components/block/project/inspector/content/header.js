import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentHeaderComponent extends Component {

  @action
  toggleLocked() {
    let { model } = this.args;
    model.update({ locked: !model.selfLocked });
  }

  @action
  toggleHidden() {
    let { model } = this.args;
    model.update({ hidden: !model.selfHidden });
  }

}
