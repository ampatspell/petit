import Base, { handler, center, edit, resize, arrows, reset, pixel, drag } from './-base';
import { action } from "@ember/object";

export default class BlockProjectToolsSceneComponent extends Base {

  @action
  bindKeys(keys) {
    center(this, keys);
    arrows(this, keys);
    edit(this, keys);
    resize(this, keys);
    reset(this, keys);
    pixel(this, keys);
    drag(this, keys);

    // TODO: locked
    let delta = (x, y) => handler(() => {
      if(this.tool.type === 'edit') {
        let selected = this.node.nodes.selected;
        if(selected.parent.type === 'scene/layer') {
          selected.update(selected.delta({ x, y }));
        }
      }
    });
    keys.add('up', delta(0, -1));
    keys.add('down', delta(0, 1));
    keys.add('left', delta(-1, 0));
    keys.add('right', delta(1, 0));
  }

}
