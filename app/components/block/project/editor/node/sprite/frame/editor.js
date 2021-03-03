import Group from 'ember-cli-konva/components/konva/node/group';
import { reads } from "macro-decorators";
import { stroke } from 'petit/util/stroke';

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

  get border() {
    let { editing, sprite: { lock: { locked } }, size: { width, height } } = this;
    return {
      x: 0,
      y: 0,
      width,
      height,
      stroke: stroke(locked, editing),
      strokeWidth: 1,
      listening: false
    };
  }

}
