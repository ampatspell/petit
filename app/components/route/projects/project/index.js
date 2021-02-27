import Component from '@glimmer/component';
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { reads } from "macro-decorators";

export default class RouteProjectsProjectIndexComponent extends Component {

  @service dialogs;
  @service router;

  @reads('args.project') project;

  @action
  async delete() {
    let confirmed = await this.dialogs.alert('Are you sure you want to delete this project?', 'Cancel', 'Delete');
    if(!confirmed) {
      return;
    }
    this.router.transitionTo('projects');
    await this.project.delete();
  }

  @action
  onBindHotkeys(hotkeys) {
    hotkeys.add('left', () => this.project.onKeyLeft());
    hotkeys.add('right', () => this.project.onKeyRight());
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ].forEach(key => {
      hotkeys.add(`${key}`, () => this.project.onKeyNumber(key));
    });
  }

}
