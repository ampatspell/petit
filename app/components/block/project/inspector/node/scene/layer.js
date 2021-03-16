import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSceneLayerComponent extends Component {

  @action
  addSpriteFrame() {
    this.args.model.createNewSpriteFrameEntity();
  }

  @action
  addSequence() {
    this.args.model.createNewSequenceEntity();
  }

}
