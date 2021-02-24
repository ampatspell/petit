import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockKonvaEditorSpriteComponent extends Component {

  @reads('args.model.group') sprite;

  @action
  onBindHotkeys(hotkeys) {
    hotkeys.add('left', () => this.sprite.selectPrevFrame());
    hotkeys.add('right', () => this.sprite.selectNextFrame());
  }

}
