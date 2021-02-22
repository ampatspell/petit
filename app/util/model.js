import { isActivated } from 'zuglet/utils';

export const active = (_target, _key, descriptor) => {
  let fn = descriptor.value;
  return {
    value: function(...args) {
      if(!isActivated(this)) {
        return;
      }
      return fn.call(this, ...args);
    }
  }
}
