import Base, { center, edit, resize, arrows, reset, pixel, drag } from './-base';
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
  }

}
