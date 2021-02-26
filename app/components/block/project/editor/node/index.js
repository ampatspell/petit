import Component from '@glimmer/component';
import { action } from "@ember/object";
import { htmlSafe } from '@ember/template';

export default class BlockProjectEditorNodeIndexComponent extends Component {

  @action
  onClick() {
    this.args.onSelect && this.args.onSelect();
  }

  get style() {
    let { node: { editor: { x, y } } } = this.args;
    return htmlSafe(`transform: translate(${x}px, ${y}px)`);
  }

}
