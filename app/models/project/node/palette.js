import Node, { data } from './-node';
import { tracked } from "@glimmer/tracking";
import { models } from 'zuglet/decorators';

export default class PaletteNode extends Node {

  typeName = 'Color Palette';
  group = this;

  @data('colors') _colors;

  @models()
    .source(({ _colors }) => _colors)
    .named('project/node/palette/color')
    .mapping((data, palette) => ({ palette, data }))
  colors;

  _didUpdateColor() {
    this._scheduleSave.schedule();
  }

  //

  @tracked _selected;

  get selected() {
    let { _selected, colors } = this;
    if(!colors.includes(_selected)) {
      return null;
    }
    return _selected;
  }

  select(color) {
    this._selected = color;
  }

  //

  // Mapped colors for tracked consume outside of konva scene functions
  get rgba() {
    let values = this.colors.map(color => color.rgba);
    return index => values[index];
  }

}
