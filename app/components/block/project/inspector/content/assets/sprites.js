import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentAssetsSpritesComponent extends Component {

  @reads('args.model.nodes.identified.sprite') sprites;
  @reads('args.model.editable.disabled') disabled;

  @action
  onSelect(model) {
    if(this.disabled) {
      return;
    }
    this.args.onSelect?.(model);
  }

}
