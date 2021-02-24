import Component from '@glimmer/component';
import { reads } from "macro-decorators";

export default class BlockProjectTimelineIndexComponent extends Component {

  @reads('args.node.group') group;
  @reads('group.type') type;
  @reads('group.needsTimeline') needsTimeline;

}
