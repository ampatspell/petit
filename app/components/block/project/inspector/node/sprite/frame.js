import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class BlockProjectInspectorNodeSpriteFrameComponent extends Component {

  tabs = [
    { id: 'frame', label: 'Frame' },
    { id: 'sprite', label: 'Sprite' }
  ];

  @tracked tab = this.tabs[0];

  @action
  selectTab(tab) {
    this.tab = tab;
  }

  @action
  clearFrame() {
    this.args.model.clear();
  }

  @action
  duplicateFrame() {
    this.args.model.duplicate();
  }

}
