import Base from './-base';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSceneLayerEntitySequenceComponent extends Base {

  @reads('entity.sequence.model') sequence;
  @reads('sequence.frames') frames;
  @reads('sequence.framerate') framerate;

  // TODO: move to editor
  get size() {
    let { entity: { width, height }, pixel } = this;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

}
