import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";
import SyntheticNode from '../-synthetic-node';

export default class SequenceFrame extends SyntheticNode {

  type = 'sequence/frame';
  typeName = 'Frame';

  @reads('data.identifier') identifier;

  @cached
  get frame() {
    let { frames, identifier } = this;
    return frames.sprite?.frameByIdentifier(identifier);
  }

}
