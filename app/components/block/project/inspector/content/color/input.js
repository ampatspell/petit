import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentColorInputComponent extends Component {

  rgba = [ 'r', 'g', 'b' ];

  hsv = [
    { key: 'h', min: 0, max: 359 },
    { key: 's', min: 0, max: 100 },
    { key: 'v', min: 0, max: 100 }
  ];

  @action
  onChange(key, value) {
    this.args.model.update({ [key]: value });
  }

}
