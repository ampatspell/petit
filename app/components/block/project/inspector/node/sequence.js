import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSequenceComponent extends Component {

  @action
  addFrame() {
    this.args.model.addNewFrame();
  }

}
