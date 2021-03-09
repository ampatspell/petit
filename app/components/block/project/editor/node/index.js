import Component from '@glimmer/component';
import { action } from "@ember/object";
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeIndexComponent extends Component {

  @reads('args.node') node;
  @reads('node.nodes.selected.group') selected;
  @reads('selected.tools.selected') selectedTool;
  @reads('node.tools.selected') nodeTool;

  @action
  didInsertContentElement(el) {
    this.contentElement = el;
  }

  get editor() {
    let editor = this.args.node.editor;
    assert(`Editor is requierd for ${this.args.node}`, !!editor);
    return editor;
  }

  get overlays() {
    if(!this.args.overlays) {
      return false;
    }
    return !this.nodeTool?.overlaysHidden;
  }

  @action
  onClick() {
    this.args.onSelect && this.args.onSelect();
  }

  get style() {
    let { x, y } = this.editor;
    return htmlSafe(`transform: translate(${x}px, ${y}px)`);
  }

  @action
  didUpdateActions() {
    this.node.editor.actions.consume().forEach(action => {
      if(action.name === 'center') {
        this.args.onCenter(this, this.contentElement);
      }
    });
  }

}
