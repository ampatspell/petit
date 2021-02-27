import Model from '../../../-model';
import { cached } from 'tracked-toolbox';
import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";

const {
  assign
} = Object;

const data = key => reads(`data.${key}`);

export default class Color extends Model {

  @tracked data;
  @reads('palette.editable') editable;

  constructor(owner, { palette, data }) {
    super(owner);
    this.palette = palette;
    this.data = data;
  }

  mappingDidChange({ data }) {
    this.data = data;
  }

  @data('r') r;
  @data('g') g;
  @data('b') b;
  @data('a') a;

  get index() {
    return this.palette.colors.indexOf(this);
  }

  @cached
  get rgba() {
    let { r, g, b, a } = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  update(props) {
    assign(this.data, props);
    this.palette._didUpdateColor(this);
  }

  async delete() {
    await this.palette._deleteColor(this);
  }

  toStringExtension() {
    let { r, g, b, a } = this;
    return `${r},${g},${b},${a}`;
  }

}
