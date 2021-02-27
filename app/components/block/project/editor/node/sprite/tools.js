import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectEditorNodeSpriteToolsComponent extends Component {

  @action
  selectColor(color) {
    this.args.sprite.color = color;
  }

}
