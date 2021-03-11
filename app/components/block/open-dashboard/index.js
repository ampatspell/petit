import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockOpenDashboardIndexComponent extends Component {

  @action
  open() {
    this.args.doc.openDashboard();
  }

}
