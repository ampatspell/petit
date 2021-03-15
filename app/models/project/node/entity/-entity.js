import Node from '../-doc-node';
import { data } from '../-node/decorators';
import { editor, lock, hide, tools as _tools, warnings } from '../-node/properties';
import { reads } from "macro-decorators";

const tools = _tools([ 'idle', 'center' ]);

export default class SceneNode extends Node {

  constructor() {
    super(...arguments);
    editor(this);
    lock(this);
    hide(this);
    warnings(this);
    tools(this);
  }

  typeName = 'Entity';
  group = this;
  referenceKeys = [];

  @data('x') x;
  @data('y') y;

  @reads('parent') layer;
  @reads('layer.scene') scene;

}
