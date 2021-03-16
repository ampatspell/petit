import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentGridComponent extends Component {

  @reads('args.model.grid') grid;

  @action
  toggleGridEnabled() {
    let { grid } = this;
    if(grid.enabled) {
      grid.update(null);
    } else {
      grid.update({ x: 8, y: 8 });
    }
  }

}
