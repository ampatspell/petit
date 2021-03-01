import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class BlockProjectToolsSpriteComponent extends Component {

  tools = [
    { icon: 'mouse-pointer' },
    { icon: 'pen' },
    { icon: 'expand' }
  ];

  @tracked tool = this.tools[0];

  @action
  selectTool(tool) {
    this.tool = tool
  }

  @action
  selectColor(color) {
    this.args.node.color = color;
  }

}
