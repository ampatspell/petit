import Component from '@glimmer/component';
import { reads } from "macro-decorators";

const nodes = [ 'sprite' ];

export default class BlockProjectTimelineIndexComponent extends Component {

  @reads('args.node.group.type') type;

  get hasTimeline() {
    return nodes.includes(this.type);
  }

}
