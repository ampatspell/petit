import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class BlockProjectInspectorContentAssetsSpritesComponent extends Component {

  @reads('args.model.nodes.identified.sprite') sprites;
  @reads('args.model.editable.disabled') disabled;

  @tracked selectedSprite;

  get sprite() {
    return this.selectedSprite || this.args.frame?.sprite || this.args.sprite;
  }

  @action
  selectSprite(sprite) {
    if(this.disabled) {
      return;
    }
    if(this.selectedSprite === sprite) {
      this.selectedSprite = null;
      return;
    }
    this.selectedSprite = sprite;
  }

  @action
  selectFrame(frame) {
    if(this.disabled) {
      return;
    }
    this.args.onSelect?.(frame);
  }

}
