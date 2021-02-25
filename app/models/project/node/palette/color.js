import Model from '../../../-model';
import { cached } from 'tracked-toolbox';
import { reads } from "macro-decorators";

const {
  assign
} = Object;

const data = key => reads(`data.${key}`);

export default class Color extends Model {

  constructor(owner, { palette, data }) {
    super(owner);
    this.palette = palette;
    this.data = data;
    // console.log('create', this+'', data);
  }

  mappingDidChange({ data }) {
    this.data = data;
    // console.log('mappingDidChange', this+'', data);
  }

  @data('r') r;
  @data('g') g;
  @data('b') b;
  @data('a') a;

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
