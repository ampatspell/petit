import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class BlockNodePaletteSelectComponent extends Component {

  @tracked _open = false;

  @action
  setOpen() {
    if(this.args.disabled) {
      return;
    }
    this._open = true;
  }

  get open() {
    return this._open && !this.args.disabled;
  }

  @action
  select(color) {
    this._open = false;
    this.args.onSelect(color);
  }

}
