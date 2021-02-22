import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class InputTextComponent extends Component {

  @action
  onEvent(key, e) {
    let fn = this.args[key];
    fn && fn(e.target.value, e);
  }

}
