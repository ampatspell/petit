import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSpriteFrameComponent extends Component {

  @action
  clearFrame() {
    this.args.model.clear();
  }

  @action
  duplicateFrame() {
    this.args.model.duplicate();
  }

}
