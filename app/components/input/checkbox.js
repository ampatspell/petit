import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class InputCheckboxComponent extends Component {

  @action
  onChange(e) {
    let value = e.target.checked;
    let { onChange } = this.args;
    onChange && onChange(value, e);
  }

}
