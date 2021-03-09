import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class BlockProjectInspectorNodeSpriteComponent extends Component {

  tabs = [
    { id: 'sprite', label: 'Sprite' },
    { id: 'colors', label: 'Colors' }
  ];

  @tracked tab = this.tabs[0];

  @action
  selectTab(tab) {
    this.tab = tab;
  }

  @action
  addFrame() {
    this.args.model.createNewFrame();
  }

}
