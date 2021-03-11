import Node from './-node';
import { data } from './-node/doc';
import { editor } from './-node/editor';
import { lock } from './-node/lock';
import { editable } from './-node/editable';
import { hide } from './-node/hide';
import { pixel } from './-node/pixel';
import { warnings, Warning } from './-node/warnings';
import { tools as _tools } from './-node/tools';
import { actions } from './-node/actions';
import { tracked } from "@glimmer/tracking";
import { models } from 'zuglet/decorators';
import { lastObject, removeAt, uniq } from 'petit/util/array';

const tools = node => _tools(node, [
  { icon: 'mouse-pointer', type: 'idle' },
]);

class ColorIdentifierConflict extends Warning {

  get description() {
    return `Color identifier conflict`;
  }

  get has() {
    let identifiers = this.node.colors.map(color => color.identifier).filter(Boolean);
    let unique = uniq(identifiers);
    return unique.length !== identifiers.length;
  }

}

export default class PaletteNode extends Node {

  typeName = 'Palette';

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    pixel(this);
    tools(this);
    editable(this);
    actions(this);
    warnings(this, {
      add: [ ColorIdentifierConflict ]
    });
  }

  group = this;

  @data('x') x;
  @data('y') y;
  @data('colors') _colors;

  @models()
    .source(({ _colors }) => _colors)
    .named('project/node/palette/color')
    .mapping((data, palette) => ({ palette, data }))
  colors;

  get identifiedColors() {
    return this.colors.filter(color => !!color.identifier);
  }

  colorByIdentifier(identifier) {
    return this.colors.find(color => color.identifier === identifier) || null;
  }

  _didUpdate() {
    this.scheduleSave.schedule();
  }

  _didUpdateColor() {
    this._didUpdate();
  }

  _deleteColor(color) {
    this.doc.data.colors = removeAt(this.doc.data.colors, this.colors.indexOf(color));
    this._didUpdate();
    this.actions.invoke('delete-color', color);
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
    this.actions.invoke('select-color', color);
  }

  //

  createNewColor() {
    let identifier = `c_${this._colors.length + 1}`;
    this._colors.push({ r: 255, g: 100, b: 200, a: 255, identifier });
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

  get canvas() {
    let values = this.colors.map(color => color.canvas);
    return index => values[index];
  }

}
