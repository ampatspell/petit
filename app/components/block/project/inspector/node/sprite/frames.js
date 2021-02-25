import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSpriteFramesComponent extends Component {

  @action
  addFrame() {
    this.args.model.createNewFrame();
  }

}
