import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSpriteColorsComponent extends Component {

  @action
  compact() {
    this.args.model.colors.compact();
  }

}
