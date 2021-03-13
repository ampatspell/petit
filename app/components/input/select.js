import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class InputSelectComponent extends Component {

  @tracked _open = false;

  @action
  setOpen() {
    if(this.args.disabled) {
      return;
    }
    this._open = true;
  }

  @action
  setClosed() {
    this._open = false;
  }

  get open() {
    return this._open && !this.args.disabled;
  }

  @action
  select(color) {
    this._open = false;
    this.args.onChange?.(color);
  }

}
