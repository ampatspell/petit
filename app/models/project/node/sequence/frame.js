import Node from '../-data-node';
import { reads } from "macro-decorators";
import { cached } from "tracked-toolbox";
import { warnings, Warning } from '../-node/properties';

class MissingFrame extends Warning {

  get description() {
    return 'Missing frame';
  }

  get has() {
    return this.node.sprite && !this.node.frame;
  }

}

export default class SequenceFrame extends Node {

  type = 'sequence/frame';
  typeName = 'Frame';

  constructor() {
    super(...arguments);
    warnings(this, {
      replace: [ MissingFrame ]
    });
  }

  @reads('data.identifier') identifier;
  @reads('data.frame') _frame;

  @reads('parent') sequence;
  @reads('sequence.sprite.model') sprite;

  get description() {
    let { _frame, identifier } = this;
    return [ _frame, identifier ].filter(Boolean).join(' – ');
  }

  @cached
  get frame() {
    let { sprite, _frame } = this;
    return sprite?.frameByIdentifier(_frame);
  }

}
