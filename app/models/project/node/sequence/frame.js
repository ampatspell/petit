import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";
import DataNode from '../-data-node';
import { warnings, Warning } from '../-node/properties';

class MissingFrame extends Warning {

  get description() {
    return 'Missing frame';
  }

  get has() {
    return this.node.sprite && !this.node.frame;
  }

}

export default class SequenceFrame extends DataNode {

  type = 'sequence/frame';
  typeName = 'Frame';

  constructor() {
    super(...arguments);
    warnings(this, {
      replace: [ MissingFrame ]
    });
  }

  @reads('data.identifier') identifier;

  @reads('parent') sequence;
  @reads('sequence.sprite.model') sprite;

  @cached
  get frame() {
    let { sprite, identifier } = this;
    return sprite?.frameByIdentifier(identifier);
  }

}
