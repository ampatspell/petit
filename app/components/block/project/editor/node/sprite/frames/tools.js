import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectEditorNodeSpriteFramesToolsComponent extends Component {

  @action
  selectColor(color) {
    this.args.frames.color = color;
  }

}
