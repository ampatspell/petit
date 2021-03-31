import Component from '@glimmer/component';
import { reads, equal } from "macro-decorators";

export default class BlockEditorBorderComponent extends Component {

  @reads('args.node') node;
  @reads('node.nodes.selected.group') selected;
  @reads('node.tools.tool') tool;
  @equal('tool.type', 'edit') editing;
  @equal('tool.overlaysHidden', true) overlaysHidden;
  @reads('node.lock.locked') locked;

  get state() {
    let { overlaysHidden, locked, editing, node, selected } = this;
    let classes = [];

    selected = node === selected;

    if(selected) {
      classes.push('selected');
    }

    if(overlaysHidden) {
      classes.push('hidden');
    } else if(editing) {
      classes.push('editing');
    } else if(locked) {
      classes.push('locked');
    } else {
      classes.push('regular');
    }

    return classes.join(' ');
  }

}
