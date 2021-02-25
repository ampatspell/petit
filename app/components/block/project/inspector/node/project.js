import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectInspectorNodeProjectComponent extends Component {

  @reads('args.model.nodes') nodes;

  @action
  addSprite() {
    this.nodes.createNewSprite();
  }

  @action
  addScene() {
    this.nodes.createNewScene();
  }

  @action
  addPalette() {
    this.nodes.createNewPalette();
  }

}
