import BaseNode from './-base-node';
import { reads } from "macro-decorators";
import { assert } from '@ember/debug';
import { removeObject } from 'petit/util/array';

export default class DataNode extends BaseNode {

  type = null;
  typeName = null;

  constructor(owner, { key, parent, data }) {
    assert('key is required', !!key);
    assert('parent is required', !!parent);
    assert('data is required', !!data);
    super(owner, { nodes: parent.nodes });
    this.key = key;
    this.parent = parent;
    this.data = data;
  }

  //

  @reads('parent.exists') exists;
  @reads('parent.editable') editable;
  @reads('data.index') index;

  //

  children = [];

  //

  update(props, schedule=true) {
    Object.assign(this.data, this._normalizeReferences(props));
    if(schedule) {
      this.parent.scheduleSave.schedule();
    }
  }

  delete() {
    let { parent: { scheduleSave, doc }, key, data } = this;
    let array = doc.data[key];
    console.log(key, array, data);
    removeObject(array, data);
    scheduleSave.schedule();
  }

}
