import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSequenceComponent extends Component {

  tabs = [
    { id: 'sequence', label: 'Sequence' },
    { id: 'frames', label: 'Frames' }
  ];

  @tracked tab = this.tabs[0];

  @action
  selectTab(tab) {
    this.tab = tab;
  }

}
