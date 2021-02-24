import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockTreeItemComponent extends Component {

  @action
  onSelect(e) {
    e.stopPropagation();
    this.args.onSelect && this.args.onSelect(e);
  }

  @action
  onToggleLock(e) {
    e.stopPropagation();
    let { locked, parentLocked, onUpdate } = this.args;
    let selfLocked = locked && !parentLocked;
    onUpdate && onUpdate({ locked: !selfLocked });
  }

  get lock() {
    let { locked, parentLocked } = this.args;

    let icon;
    let faded;

    if(locked) {
      icon = 'lock';
      faded = parentLocked;
    } else {
      icon = 'unlock';
      faded = true;
    }

    return {
      icon,
      faded
    };
  }

}
