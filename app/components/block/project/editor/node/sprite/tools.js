import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectEditorNodeSpriteToolsComponent extends Component {

  tools = [
    { icon: 'mouse-pointer' },
    { icon: 'pen' },
    { icon: 'expand' }
  ];

  @action
  selectColor(color) {
    this.args.sprite.color = color;
  }

}
