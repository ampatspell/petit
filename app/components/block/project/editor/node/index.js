import Component from '@glimmer/component';
import { action } from "@ember/object";
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

export default class BlockProjectEditorNodeIndexComponent extends Component {

  get editor() {
    let editor = this.args.node.editor;
    assert(`Editor is requierd for ${this.args.node}`, !!editor);
    return editor;
  }

  get overlays() {
    if(!this.args.overlays) {
      return false;
    }
    return !this.args.node.tools?.selected.overlaysHidden;
  }

  @action
  onClick() {
    this.args.onSelect && this.args.onSelect();
  }

  get style() {
    let { x, y } = this.editor;
    return htmlSafe(`transform: translate(${x}px, ${y}px)`);
  }

}
