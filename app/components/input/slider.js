import Component from '@glimmer/component';
import { action } from "@ember/object";
import { round as r } from 'petit/util/math';
import { reads } from "macro-decorators";

export default class InputSliderComponent extends Component {

  @reads('args.round') round;
  @reads('args.type', 'int') type;

  @action
  onEvent(key, e) {
    let value = e.target.value;

    let { type, round } = this;
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
