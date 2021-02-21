import Component from '@glimmer/component';
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class RouteDevComponent extends Component {

  @service store;

  @action
  async onClick() {
  }

}
