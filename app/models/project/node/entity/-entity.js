import Node from '../-doc-node';
import { data } from '../-node/decorators';
import { editor, lock, hide, tools as _tools, warnings } from '../-node/properties';
import { reads } from "macro-decorators";

const tools = _tools([ 'idle', 'center' ]);

export default class EntityNode extends Node {

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    warnings(this);
    tools(this);
  }

  typeName = 'Entity';

  get group() {
    return this.scene;
  }

  @data('x') x;
  @data('y') y;

  @reads('parent') layer;
  @reads('layer.scene') scene;

  step = 1;

  clamp(position) {
    let { step } = this;
    let _c = prop => Math.floor(position[prop] / step) * step;
    return {
      x: _c('x'),
      y: _c('y')
    }
  }

  delta(props) {
    let { step } = this;
    let _c = prop => this[prop] + (props[prop] * step);
    return {
      x: _c('x'),
      y: _c('y')
    };
  }

  didDeselect(next) {
    this.scene.didDeselectEntity(this, next);
  }

}
