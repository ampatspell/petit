import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class BlockProjectInspectorNodeSceneEntityBaseComponent extends Component {

  tabs = [
    { id: 'entity', label: 'Entity' },
    { id: 'assets', label: 'Assets' }
  ];

  @tracked tab = this.tabs[0];

  @action
  selectTab(tab) {
    this.tab = tab;
  }

}
