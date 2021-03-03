import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorContentPositionComponent extends Component {

  props = [
    { label: 'X', key: 'x' },
    { label: 'Y', key: 'y' }
  ];

  @action
  onChange(key, value) {
    this.args.model.update({ [key]: value });
  }

}
