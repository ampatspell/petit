import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

class Item {

  constructor(root, type, label, items) {
    this.root = root;
    this.type = type;
    this.label = label;
    this.items = items;
  }

  get isSelected() {
    return this.root.selected === this;
  }

}

const item = (root, type, label, items) => new Item(root, type, label, items);

export default class RouteDevComponent extends Component {

  items = [
    item(this, 'Scene', 'Nice one', [
      item(this, 'Layer', 'Characters', [
        item(this, 'Sprite', 'Ducky')
      ])
    ])
  ];

  @tracked selected = null;

  @action
  select(item) {
    this.selected = item;
  }

}
