import Node from '../-data-node';
import { reads } from "macro-decorators";
import { warnings, MissingReferences } from '../-node/properties';
import { reference } from '../-node/decorators';

export default class SequenceFrame extends Node {

  type = 'sequence/frame';
  typeName = 'Sequence Frame';
  referenceKeys = [ 'frame' ];

  constructor() {
    super(...arguments);
    warnings(this, {
      replace: [ MissingReferences ]
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

  @reference('frame', '_frame', (node, _type, identifier) => node.sprite?.frameByIdentifier(identifier))
  frame;

}
