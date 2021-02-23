import Node from './-node';

export default class EntityNode extends Node {

  get group() {
    return this.parent.group;
  }

}
