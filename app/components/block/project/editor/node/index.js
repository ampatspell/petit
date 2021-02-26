import Component from '@glimmer/component';
import { action } from "@ember/object";
import { htmlSafe } from '@ember/template';

export default class BlockProjectEditorNodeIndexComponent extends Component {

  @action
  onClick() {
    this.args.onSelect && this.args.onSelect();
  }

  get style() {
    return htmlSafe(`transform: translate(10px, 10px)`);
  }

}
