import { cached } from 'tracked-toolbox';

export default class Color {

  constructor(r, g, b, a=1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  @cached
  get rgb() {
    let { r, g, b, a } = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  static transparent() {
    return new this(0, 0, 0, 0);
  }

  static color(r, g, b, a) {
    return new this(r, g, b, a);
  }

}
