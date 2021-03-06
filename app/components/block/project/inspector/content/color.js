import Component from '@glimmer/component';
import { action } from "@ember/object";
import Color from 'color';

export default class BlockProjectInspectorContentColorComponent extends Component {

  props = [ 'r', 'g', 'b', 'a' ];

  get hex() {
    let { model: { r, g, b } } = this.args;
    return Color({ r, g, b }).hex().toString();
  }

  @action
  onChange(key, value) {
    this.args.model.update({ [key]: value });
  }

  @action
  onHex(value) {
    let object;
    try {
      object = Color(value).object();
    } catch(err) {
      return;
    }

    let { r, g, b } = object;
    this.args.model.update({ r, g, b });
  }

}
