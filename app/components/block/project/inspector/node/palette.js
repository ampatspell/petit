import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";

export default class BlockProjectInspectorNodePaletteComponent extends Component {

  @reads('args.model') model;
  @reads('model.color') color;

  tabs = [
    { id: 'palette', label: 'Palette' },
    { id: 'color', label: 'Color' }
  ];

  @tracked tab = this.tabs[0];

  @action
  selectTab(tab) {
    this.tab = tab;
  }

  @action
  addColor() {
    this.model.createNewColor();
  }

  @action
  deleteColor() {
    this.model.color.delete();
  }

  @action
  onColorSelected() {
    this.selectTab(this.tabs.find(tab => tab.id === 'color'));
  }

}
