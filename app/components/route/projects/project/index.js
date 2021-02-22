import Component from '@glimmer/component';
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class RouteProjectsProjectIndexComponent extends Component {

  @service dialogs;
  @service router;

  @action
  async delete() {
    let confirmed = await this.dialogs.alert('Are you sure you want to delete this project?', 'Cancel', 'Delete');
    if(!confirmed) {
      return;
    }
    this.router.transitionTo('projects');
    await this.args.project.delete();
  }

}
