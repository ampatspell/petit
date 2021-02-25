import Node, { data } from './-node';
import { tracked } from "@glimmer/tracking";
import { models } from 'zuglet/decorators';
import { lastObject, removeAt } from '../../../util/array';

export default class PaletteNode extends Node {

  typeName = 'Color Palette';
  group = this;

  @data('colors') _colors;

  @models()
    .source(({ _colors }) => _colors)
    .named('project/node/palette/color')
    .mapping((data, palette) => ({ palette, data }))
  colors;

  _didUpdate() {
    this._scheduleSave.schedule();
  }

  _didUpdateColor() {
    this._didUpdate();
  }

  _deleteColor(color) {
    this.doc.data.colors = removeAt(this.doc.data.colors, this.colors.indexOf(color));
    this._didUpdate();
  }

  //

  @tracked _color;

  get color() {
    let { _color, colors } = this;
    if(!colors.includes(_color)) {
      return null;
    }
    return _color;
  }

  select(color) {
    this._color = color;
  }

  //

  createNewColor() {
    this._colors.push({ r: 229, g: 112, b: 126, a: 1 });
    let color = lastObject(this.colors);
    this.select(color);
    this._didUpdate();
  }

  //

  // Mapped colors for tracked consume outside of konva scene functions
  get rgba() {
    let values = this.colors.map(color => color.rgba);
    return index => values[index];
  }

}