import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads, equal } from "macro-decorators";

export default class BlockProjectEditorNodeSceneIndexComponent extends Component {

  @reads('args.node') scene;
  @reads('scene.visibleLayers') layers;

  @equal('scene.tools.selected.type', 'resize') resizing;

  get size() {
    let { width, height, pixel: { absolute: pixel } } = this.scene;
    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

  @action
  onResize(frame) {
    this.scene.resize(frame);
  }

}
