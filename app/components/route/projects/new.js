import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class RouteProjectsNewComponent extends Component {

  @action
  update(key, value) {
    this.args.model.update({ [key]: value });
  }

  @action
  save() {
    this.args.model.save();
  }

}
