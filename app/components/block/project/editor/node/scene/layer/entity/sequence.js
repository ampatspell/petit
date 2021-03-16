import Base from './-base';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSceneLayerEntitySequenceComponent extends Base {

  @reads('entity.sequence.model') sequence;
  @reads('sequence.frames') frames;
  @reads('sequence.framerate') framerate;

}
