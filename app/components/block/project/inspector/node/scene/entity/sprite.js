import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSceneEntitySpriteComponent extends Component {

  @action
  onAssetSelected(asset) {
    // TODO: remove
    let { args: { model } } = this;
    if(asset.type === 'sprite/frame') {
      model.update({ sprite: asset.sprite, frame: asset });
    }
  }

}
