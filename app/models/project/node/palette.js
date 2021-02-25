import Node, { data } from './-node';
import { cached } from 'tracked-toolbox';

class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

export default class PaletteNode extends Node {

  typeName = 'Color Palette';
  group = this;

  // @data('colors') _colors;

  @cached
  get colors() {
    return [
      new Color(0, 0, 0, 0),
      new Color(0, 0, 0, 1),
      new Color(255, 255, 255, 1)
    ];
  }

}
