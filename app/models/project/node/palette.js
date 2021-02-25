import Node, { data } from './-node';
import { cached } from 'tracked-toolbox';
import Color from './palette/color';

export default class PaletteNode extends Node {

  typeName = 'Color Palette';
  group = this;

  // @data('colors') _colors;

  @cached
  get colors() {
    return [
      Color.transparent(),
      Color.color(255, 255, 255),
      Color.color(0, 0, 0),
      Color.color(220, 0, 100),
    ];
  }

  rgba(index) {
    return this.colors[index]?.rgba;
  }

}
