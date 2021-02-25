import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";
import { Pixel } from 'petit/util/pixel';
import { editing } from 'petit/util/editing';

export default class BlockKonvaEditorSpriteFramesIndexComponent extends Component {

  @reads('args.model.group') frames;
  @reads('frames.frame') frame;

  @editing('frame.locked') editing;
  @tracked color = Pixel.black;

  @action
  onBindHotkeys(hotkeys) {
    hotkeys.add('left', () => this.frames.selectPrev());
    hotkeys.add('right', () => this.frames.selectNext());

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
