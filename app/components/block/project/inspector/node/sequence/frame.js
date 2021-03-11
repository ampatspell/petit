import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSequenceFrameComponent extends Component {

  @action
  updateFrame(frame) {
    this.args.model.update({ frame });
  }

}
