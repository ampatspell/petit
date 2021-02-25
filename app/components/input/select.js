import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class InputSelectComponent extends Component {

  @action
  onChange(e) {
    let index = e.target.selectedIndex;
    let { values, onChange } = this.args;
    let value = values[index];
    onChange && onChange(value, e);
  }

}
