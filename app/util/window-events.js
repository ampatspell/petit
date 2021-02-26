import { getInstance } from './instances';
import { registerDestructor } from '@ember/destroyable';

class WindowEvents {

  constructor(target, fn) {
    this.target = target;
    this.fn = fn;
  }

  withHandlers(cb) {
    let hash = this.handlers;
    for(let key in hash) {
      cb(window, key, hash[key]);
    }
  }

  start() {
    if(this.handlers) {
      return;
    }
    this.handlers = this.fn.call(this.target);
    this.withHandlers((window, name, fn) => window.addEventListener(name, fn));
  }

  stop() {
    if(!this.handlers) {
      return;
    }
    this.withHandlers((window, name, fn) => window.removeEventListener(name, fn));
    this.handlers = null;
  }

}

export const events = (_target, key, descriptor) => {
  return {
    get() {
      return getInstance(this, key, () => {
        let events = new WindowEvents(this, descriptor.get);
        registerDestructor(this, () => events.stop());
        return events;
      });
    }
  }
}
