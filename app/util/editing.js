import { tracked } from "@glimmer/tracking";
import { getInstance } from './instances';
import { getPath } from './path';

class Editing {

  target = null;
  locked = null;

  @tracked editing = false;

  constructor(target, locked, initial) {
    this.target = target;
    this.locked = locked;
    this.editing = initial;
  }

  get isLocked() {
    let { target, locked } = this;
    return getPath(target, locked);
  }

  get value() {
    let { isLocked, editing } = this;
    return !isLocked && editing;
  }

  set value(value) {
    if(this.isLocked) {
      return;
    }
    this.editing = value;
  }

}

const getEditing = (target, key, locked, initial) => getInstance(target, key, () => new Editing(target, locked, initial));

export const editing = (locked='lock.locked') => (_target, key, def) => {
  let initial = def.initializer ? def.initializer() : false;
  return {
    get() {
      return getEditing(this, key, locked, initial).value;
    },
    set(value) {
      getEditing(this, key, locked, initial).value = value;
      return value;
    }
  };
}
