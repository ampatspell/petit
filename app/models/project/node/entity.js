import Node from './-node';

export default class EntityNode extends Node {

  typeName = 'Entity';

  get group() {
    return this.parent.group;
  }

}
