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

  @action
  onToggleHidden(e) {
    e.stopPropagation();
    let { hidden, onUpdate } = this.args;
    onUpdate && onUpdate({ hidden: !hidden });
  }

  @action
  toggleExpand(e) {
    e.stopPropagation();
    let { expanded, onUpdate } = this.args;
    onUpdate && onUpdate({ expanded: !expanded });
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

  get hidden() {
    let { hidden, parentHidden } = this.args;
    let icon;
    let faded;

    if(hidden) {
      icon = 'eye-slash';
      faded = parentHidden;
    } else {
      icon = 'eye';
      faded = true;
    }

    return {
      icon,
      faded
    };
  }

}
