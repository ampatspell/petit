import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentAssetsHeaderComponent extends Component {

  @tracked open = false;

  @action
  toggle() {
    this.open = !this.open;
  }

}
