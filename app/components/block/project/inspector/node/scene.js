import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockProjectInspectorNodeSceneComponent extends Component {

  @action
  addLayer() {
    this.args.model.createNewLayer();
  }

}
