import Entity from './-entity';
import { data, reference } from '../../-node/decorators';
import { reads } from "macro-decorators";

export default class SequenceEntity extends Entity {

  typeName = 'Sequence Entity';
  referenceKeys = [ 'sequence' ];

  @data('sequence') _sequence;
  @reference('sequence', '_sequence') sequence;

  @reads('sequence.model.width') width;
  @reads('sequence.model.height') height;

}
