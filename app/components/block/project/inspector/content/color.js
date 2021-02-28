import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentColorComponent extends Component {

  props = [ 'r', 'g', 'b', 'a' ];

  @action
  onChange(key, value) {
    this.args.model.update({ [key]: value });
  }

}
