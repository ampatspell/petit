import { setGlobal } from '../util/set-global';

export default {
  name: 'petite:dev',
  // eslint-disable-next-line no-unused-vars
  initialize(app) {
    if(typeof window !== 'undefined') {
      window.setGlobal = setGlobal;
    }
  }
};
