import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class BlockProjectInspectorNodeSceneLayerComponent extends Component {

  tabs = [
    { id: 'layer', label: 'Layer' },
    { id: 'assets', label: 'Assets' }
  ];

  @tracked tab = this.tabs[0];

  @action
  selectTab(tab) {
    this.tab = tab;
  }

  @action
  addSpriteFrame() {
    this.args.model.createNewSpriteFrameEntity();
  }

  @action
  addSequence() {
    this.args.model.createNewSequenceEntity();
  }

  @action
  onAssetSelected(asset) {
    let { args: { model } } = this;
    if(asset.type === 'sprite/frame') {
      let frame = asset;
      let sprite = frame.sprite;
      model.createNewSpriteFrameEntity({ sprite, frame });
    } else if(asset.type === 'sequence') {
      let sequence = asset;
      model.createNewSequenceEntity({ sequence });
    }
  }

}
