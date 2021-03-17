import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSceneEntitySpriteComponent extends Component {

  @action
  onAssetSelected(asset) {
    console.log(asset+'');
    // TODO: remove
    // if(asset.type === 'sprite/frame') {
      // this.args.model.update({ sequence: asset });
    // }
  }

}
