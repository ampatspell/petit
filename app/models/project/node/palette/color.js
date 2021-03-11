import Node from '../-data-node';
import { warnings, Warning } from '../-node/properties';
import { cached } from 'tracked-toolbox';
import { reads } from "macro-decorators";
import { round } from 'petit/util/math';
import TheColor from 'color';
import { compact } from 'petit/util/object';

const {
  assign
} = Object;

const data = key => reads(`data.${key}`);

const hsv = (_target, key) => ({
  get() {
    return this._hsv[key];
  }
});

class IdentifierConflict extends Warning {

  get description() {
    return 'Identifier conflict';
  }

  @cached
  get has() {
    let { node, node: { identifier, palette }  } = this;
    if(!identifier) {
      return false;
    }
    return !!palette.colors.find(color => color !== node && color.identifier === identifier);
  }

}

export default class Color extends Node {

  type = 'palette/color';
  typeName = 'Color';

  @reads('parent') palette;

  @data('identifier') identifier;
  @data('r') r;
  @data('g') g;
  @data('b') b;
  @data('a') a;

  constructor() {
    super(...arguments);
    warnings(this, { replace: [ IdentifierConflict ] });
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
    super.update(props);
  }

  toStringExtension() {
    let { r, g, b, a } = this;
    return `${r},${g},${b},${a}`;
  }

}
