import Node from './-doc-node';
import { data } from './-node/decorators';
import { editor, lock, editable, hide, pixel, warnings, Warning, tools as _tools, actions, expand, selection } from './-node/properties';
import { models } from 'zuglet/decorators';
import { lastObject, uniq, sortedBy } from 'petit/util/array';
import { cached } from "tracked-toolbox";

const tools = _tools([ 'idle', 'center' ]);

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
    expand(this);
    pixel(this);
    tools(this);
    editable(this);
    actions(this);
    warnings(this, {
      add: [ ColorIdentifierConflict ]
    });
    selection(this);
  }

  group = this;

  @data('x') x;
  @data('y') y;
  @data('colors') _colors;

  @models()
    .source(({ _colors }) => _colors)
    .named('project/node/palette/color')
    .mapping((data, parent) => ({ key: 'colors', parent, data }))
  colors;

  @cached
  get children() {
    return sortedBy(this.colors, 'index');
  }

  //

  get identifiedColors() {
    return this.children.filter(color => !!color.identifier);
  }

  colorByIdentifier(identifier) {
    return this.colors.find(color => color.identifier === identifier) || null;
  }

  //

  createNewColor() {
    let index = lastObject(this.children)?.index || 0;
    let identifier = this.nodes.createIdentifier('palette/color');
    this._colors.push({
      index,
      identifier,
      r: 255,
      g: 100,
      b: 200,
      a: 255
    });
    this.scheduleSave.schedule();
    this.nodes.select(this.colors.find(color => color.identifier === identifier));
  }

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
