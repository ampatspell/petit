import Base, { handler, center, edit, resize, arrows, reset, pixel, drag } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSpriteComponent extends Base {

  @action
  bindKeys(keys) {
    center(this, keys);
    arrows(this, keys);
    edit(this, keys);
    resize(this, keys);
    reset(this, keys);
    pixel(this, keys);
    drag(this, keys);

    keys.add('left', handler(() => this.node.selection.prev()));
    keys.add('right', handler(() => this.node.selection.next()));

    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].forEach(n => {
      keys.add(`${n}`, handler(() => {
        let color = this.node.palette.model?.colors[n - 1];
        if(color) {
          this.node.color = color;
        }
      }));
    });
  }

  @action
  selectColor(color) {
    this.args.node.color = color;
  }

}
