import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSceneEntitySequenceComponent extends Component {

  @action
  onAssetSelected(asset) {
    // TODO: remove
    if(asset.type === 'sequence') {
      this.args.model.update({ sequence: asset });
    }
  }

}
