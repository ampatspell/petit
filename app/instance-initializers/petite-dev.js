import { setGlobal } from '../util/set-global';
import { registerDeprecationHandler } from '@ember/debug';

export default {
  name: 'petite:dev',
  // eslint-disable-next-line no-unused-vars
  initialize(app) {
    if(typeof window !== 'undefined') {
      window.setGlobal = setGlobal;
    }

    registerDeprecationHandler((message, options, next) => {
      if(options.id === 'ember-string.htmlsafe-ishtmlsafe') {
        return;
      }
      next(message, options);
    });
  }
};
