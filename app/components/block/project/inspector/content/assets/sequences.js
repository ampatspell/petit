import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentAssetsSequencesComponent extends Component {

  @reads('args.model.nodes.identified.sequence') sequences;
  @reads('args.model.editable.disabled') disabled;

  @action
  onSelect(model) {
    if(this.disabled) {
      return;
    }
    this.args.onSelect?.(model);
  }

}
