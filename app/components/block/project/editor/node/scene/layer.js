import Group from 'ember-cli-konva/components/konva/node/group';
import { reads } from "macro-decorators";

export default class BlockProjectEditorNodeSceneLayerComponent extends Group {

  @reads('args.layer') layer;

  get nodeProperties() {
    let { args: { size: { width, height } } } = this
    return {
      x: 0,
      y: 0,
      width,
      height
    };
  }

  didCreateNode() {
    this.on('mousedown', e => {
      let { target } = e;
      let name = target.name();
      if(name === 'layer-background') {
        let { layer, layer: { nodes } } = this;
        nodes.select(layer);
      }
    });
  }

}
