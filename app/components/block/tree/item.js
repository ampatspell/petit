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
    this.args.lock.toggle();
  }

  @action
  onToggleHidden(e) {
    e.stopPropagation();
    this.args.hide.toggle();
  }

  @action
  toggleExpand(e) {
    e.stopPropagation();
    let { expanded, onUpdate } = this.args;
    onUpdate && onUpdate({ expanded: !expanded });
  }

  get lock() {
    let { locked, parent } = this.args.lock;

    let icon;
    let faded;

    if(locked) {
      icon = 'lock';
      faded = parent;
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
    let { hidden, parent } = this.args.hide;
    let icon;
    let faded;

    if(hidden) {
      icon = 'eye-slash';
      faded = parent;
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
