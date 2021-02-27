import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";
import { Pixel } from 'petit/util/pixel';

export default class BlockProjectEditorNodeSpriteFramesIndexComponent extends Component {

  @reads('args.node') frames;
  @reads('frames.frame') frame;
  @reads('frame.palette.model') palette;
  @reads('frames.editing') editing;

  @tracked color = Pixel.black;

  get size() {
    let { width, height, pixel } = this.frame;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

  // @action
  // onBindHotkeys(hotkeys) {
  //   hotkeys.add('left', () => this.frames.selectPrev());
  //   hotkeys.add('right', () => this.frames.selectNext());

  //   let color = (c, value) => hotkeys.add(c, e => {
  //     e.preventRepeat();
  //     this.color = value;
  //   }, () => {
  //     this.color = Pixel.black;
  //   });
  //   color('w', Pixel.white);
  //   color('e', Pixel.transparent);
  // }

  @action
  startEditing() {
    this.frames.editing = true;
  }

}
