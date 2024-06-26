import Component from '@glimmer/component';
import { action } from "@ember/object";
import { round as r } from 'petit/util/math';

export default class InputTextComponent extends Component {

  @action
  onEvent(key, e) {
    let value = e.target.value;

    let { type, round } = this.args;
    if(type === 'int' || type === 'float') {
      if(type === 'int') {
        value = parseInt(value);
      } else {
        value = parseFloat(value);
      }
      if(isNaN(value)) {
        return;
      }
      if(round) {
        value = r(value, round);
      }
    }

    let fn = this.args[key];
    fn && fn(value, e);
  }

}
