import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectToolsBaseComponent extends Component {

  @reads('args.node.tools.all') tools;
  @reads('args.node.tools.selected') tool;

  @action
  selectTool(tool) {
    this.args.node.tools.select(tool);
  }

}
