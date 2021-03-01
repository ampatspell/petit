import Component from '@glimmer/component';
import { reads, equal } from "macro-decorators";

export default class BlockProjectEditorNodeSpriteIndexComponent extends Component {

  @reads('args.node') sprite;
  @reads('sprite.frame') frame;
  @reads('frame.palette.model') palette;
  @equal('sprite.tools.selected.type', 'edit') editing;
  @reads('sprite.color.index') color;

  get size() {
    let { width, height, pixel: { absolute: pixel } } = this.frame;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

}
