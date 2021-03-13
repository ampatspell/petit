import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectTimelineSequenceIndexComponent extends Component {

  @reads('args.node.group') sequence;
  @reads('sequence.sprite.model') sprite;
  @reads('sequence.children') frames;

  get frame() {
    let { sequence, sequence: { nodes: { selected } } } = this;
    if(selected.parent === sequence) {
      return selected;
    }
    return null;
  }

  @action
  onSelect(frame) {
    this.sequence.nodes.select(frame);
  }

}
