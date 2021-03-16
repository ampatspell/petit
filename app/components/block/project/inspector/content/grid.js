import Component from '@glimmer/component';
import { reads } from "macro-decorators";
import { action } from "@ember/object";

export default class BlockProjectInspectorContentGridComponent extends Component {

  props = [
    { label: 'X', key: 'x' },
    { label: 'Y', key: 'y' }
  ];

  @reads('args.model.grid') grid;

  @action
  toggleGridEnabled() {
    let { grid, grid: { enabled } } = this;
    grid.update({ enabled: !enabled });
  }

  @action
  onChange(key, value) {
    this.grid.update({ [key]: value });
  }

}
