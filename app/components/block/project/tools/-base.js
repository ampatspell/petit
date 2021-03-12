import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export const handler = cb => e => {
  if(e.target.tagName === 'INPUT') {
    return;
  }
  return cb(e);
}

export default class BlockProjectToolsBaseComponent extends Component {

  @reads('args.node') node;
  @reads('node.tools') tools;
  @reads('node.tools.selected') tool;

  @action
  selectTool(tool) {
    if(tool.type === 'center') {
      this.args.node.editor.actions.center();
      return;
    }
    this.args.node.tools.select(tool);
  }

}
