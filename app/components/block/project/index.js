import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectIndexComponent extends Component {

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

  // @action
  // onBindHotkeys(hotkeys) {
  //   let wrap = cb => e => {
  //     if(e.target.tagName !== 'INPUT' && !e.metaKey) {
  //       cb();
  //     }
  //   };

  //   let forward = name => wrap(() => {
  //     let project = this.project;
  //     project[name].call(project);
  //   });

  //   hotkeys.add('esc', forward('onKeyEsc'));
  //   hotkeys.add('left', forward('onKeyLeft'));
  //   hotkeys.add('right', forward('onKeyRight'));

  //   [ 'e', 'r' ].forEach(key => {
  //     hotkeys.add(key, wrap(() => this.project.onKeyLetter(key)));
  //   });

  //   [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ].forEach(key => {
  //     hotkeys.add(`${key}`, wrap(() => this.project.onKeyNumber(key)));
  //   });
  // }

}
