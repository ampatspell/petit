import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";
import SyntheticNode from '../-synthetic-node';

export default class SequenceFrame extends SyntheticNode {

  type = 'sequence/frame';
  typeName = 'Frame';

  @reads('data.identifier') identifier;

  @reads('parent') sequence;
  @reads('sequence.sprite.model') sprite;

  @cached
  get frame() {
    let { sprite, identifier } = this;
    return sprite?.frameByIdentifier(identifier);
  }

}
