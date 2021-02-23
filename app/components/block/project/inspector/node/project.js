import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeProjectComponent extends Component {

  @action
  addSprite() {
    this.args.model.nodes.createNewSprite();
  }

  @action
  addScene() {
    this.args.model.nodes.createNewScene();
  }

}
