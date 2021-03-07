import Model from '../../../-model';
import { cached } from 'tracked-toolbox';
import { reads } from "macro-decorators";
import { tracked } from "@glimmer/tracking";
import { round } from 'petit/util/math';
import { compact } from 'petit/util/object';
import TheColor from 'color';

const {
  assign
} = Object;

const data = key => reads(`data.${key}`);

const hsv = (_target, key) => ({
  get() {
    return this._hsv[key];
  }
});

export default class Color extends Model {

  typeName = 'Color';

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

  @data('identifier') identifier;
  @data('r') r;
  @data('g') g;
  @data('b') b;
  @data('a') a;

  get index() {
    return this.palette.colors.indexOf(this);
  }

  //

  get hex() {
    let { r, g, b } = this;
    return TheColor({ r, g, b }).hex().toString();
  }

  //

  get _hsv() {
    let { r, g, b } = this;
    return TheColor({ r, g, b }).hsv().round().object();
  }

  @hsv h;
  @hsv s;
  @hsv v;

  //

  @cached
  get rgba() {
    let { r, g, b, a } = this;
    return `rgba(${r}, ${g}, ${b}, ${round(a / 255, 2)})`;
  }

  @cached
  get canvas() {
    let { r, g, b, a } = this;
    return { r, g, b, a };
  }

  _normalizeProps(props) {
    let { hex, h, s, v } = props;
    let has = value => typeof value !== 'undefined';
    if(has(hex)) {
      try {
        props = TheColor(hex).object();
      } catch {
        console.error('Invalid color.update for hex', props);
        return;
      }
    } else if(has(h) || has(s) || has(v)) {
      try {
        props = TheColor(assign(this._hsv, compact({ h, s, v }))).rgb().round().object();
      } catch(e) {
        console.error('Invalid color.update for hsv', props);
        return;
      }
    }
    return props;
  }

  update(props) {
    props = this._normalizeProps(props);
    if(!props) {
      return;
    }
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
