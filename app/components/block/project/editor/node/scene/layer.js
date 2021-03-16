import Group from 'ember-cli-konva/components/konva/node/group';

export default class BlockProjectEditorNodeSceneLayerComponent extends Group {

  get nodeProperties() {
    let { args: { size: { width, height } } } = this
    return {
      x: 0,
      y: 0,
      width,
      height
    };
  }

}
