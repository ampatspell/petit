import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentColorComponent extends Component {

  @action
  onChange(key, value) {
    this.args.model.update({ [key]: value });
  }

}
