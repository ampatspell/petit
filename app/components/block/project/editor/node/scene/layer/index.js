import Group from 'ember-cli-konva/components/konva/node/group';

export default class BlockProjectEditorNodeSceneLayerIndexComponent extends Group {

  get nodeProperties() {
    let {
      args: {
        node: { x, y, scene: { pixel: { absolute: pixel } } },
        size: { width, height }
      }
    } = this;

    return {
      x: x * pixel,
      y: y * pixel,
      width,
      height
    };
  }

}
