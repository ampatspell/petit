import Group from 'ember-cli-konva/components/konva/node/group';
import { reads } from "macro-decorators";

const stroke = (locked, editing) => {
  return locked ? 'rgba(0,0,0,0.15)' : editing ? 'rgba(255,102,97,0.75)' : 'rgba(96,190,253, 0.5)'
};

export default class BlockProjectEditorNodeSpriteFramesFrameEditorComponent extends Group {

  get nodeProperties() {
    return {
      x: 0,
      y: 0
    };
  }

  @reads('args.frame') frame;
  @reads('args.editing') editing;
  @reads('args.size') size;

  get border() {
    let { editing, frame: { locked }, size: { width, height } } = this;
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

  didCreateNode() {
    this.on('dblclick', () => this.args.onStartEditing());
  }

}
