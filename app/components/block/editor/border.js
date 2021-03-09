import Component from '@glimmer/component';
import { reads, equal } from "macro-decorators";

export default class BlockEditorBorderComponent extends Component {

  @reads('args.node') node;
  @reads('node.tools.selected') tool;
  @equal('tool.type', 'edit') editing;
  @equal('tool.overlaysHidden', true) overlaysHidden;
  @reads('node.lock.locked') locked;

  get state() {
    let { overlaysHidden, locked, editing } = this;
    if(overlaysHidden) {
      return 'hidden';
    }
    if(locked) {
      return 'locked';
    }
    if(editing) {
      return 'editing';
    }
    return 'regular';
  }

}
