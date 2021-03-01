import Component from '@glimmer/component';
import { reads, equal } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectEditorNodeSpriteIndexComponent extends Component {

  @reads('args.node') sprite;
  @reads('sprite.frame') frame;
  @reads('frame.palette.model') palette;
  @equal('sprite.tools.selected.type', 'edit') editing;
  @equal('sprite.tools.selected.type', 'resize') resizing;
  @reads('sprite.color.index') color;

  get size() {
    let { width, height, pixel: { absolute: pixel } } = this.frame;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

  @action
  onResize() {
    let size;

    let start = () => {
      let { width, height } = this.sprite;
      size = { width, height };
    }

    let resize = (position, diff) => {
      let c = p => size[p] + Math.floor(diff[p] / this.frame.pixel.absolute);
      let width = c('width');
      let height = c('height');
      this.sprite.resize(position, { width, height });
    }

    let stop = () => size = null;

    return {
      start,
      resize,
      stop
    };
  }

}
