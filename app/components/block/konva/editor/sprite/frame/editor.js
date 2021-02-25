import Group from 'ember-cli-konva/components/konva/node/group';
import { pick } from 'ember-cli-konva/util/object';
import { reads } from "macro-decorators";

export default class BlockKonvaEditorSpriteFrameEditorComponent extends Group {

  get nodeProperties() {
    return pick(super.nodeProperties, [ 'x', 'y' ]);
  }

  @reads('args.frame') frame;
  @reads('args.editing') editing;

  get size() {
    let { width, height, pixel } = this.args.frame;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

  get border() {
    let { editing, size: { width, height } } = this;
    return {
      x: 0,
      y: 0,
      width,
      height,
      stroke: editing ? 'rgba(255,102,97,0.75)' : 'rgba(96,190,253, 0.5)',
      strokeWidth: 1,
      listening: false
    };
  }

  didCreateNode() {
    this.on('dblclick', () => this.args.onStartEditing());
  }

}