import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectToolsSpriteComponent extends Component {

  @reads('args.node.tools.all') tools;
  @reads('args.node.tools.selected') tool;

  @action
  selectTool(tool) {
    this.args.node.tools.select(tool);
  }

  @action
  selectColor(color) {
    this.args.node.color = color;
  }

}