import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";
import { Pixel } from '../../../../../util/pixel';
import { editing } from '../../../../../util/editing';

export default class BlockKonvaEditorSpriteIndexComponent extends Component {

  @reads('args.model.group') sprite;
  @reads('sprite.frame') frame;

  @editing('frame.locked') editing = false;
  @tracked color = Pixel.black;

  @action
  onBindHotkeys(hotkeys) {
    hotkeys.add('left', () => this.sprite.selectPrevFrame());
    hotkeys.add('right', () => this.sprite.selectNextFrame());

    let color = (c, value) => hotkeys.add(c, e => {
      e.preventRepeat();
      this.color = value;
    }, () => {
      this.color = Pixel.black;
    });
    color('w', Pixel.white);
    color('e', Pixel.transparent);
  }

  @action
  startEditing() {
    this.editing = true;
  }

  @action
  stopEditing() {
    this.editing = false;
  }

}
