import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class InputSegmentedComponent extends Component {

  @action
  onSelect(next) {
    let { args: { value, disabled, onSelect } } = this;
    if(disabled) {
      return;
    }
    if(value === next) {
      return;
    }
    onSelect && onSelect(next);
  }

}
