import Group from 'ember-cli-konva/components/konva/node/group';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSpriteFramesFrameEditorComponent extends Group {

  get nodeProperties() {
    return {
      x: 0,
      y: 0
    };
  }

  @reads('args.frame') frame;
  @reads('frame.sprite') sprite;
  @reads('args.editing') editing;
  @reads('args.size') size;

}
