import { initialize } from 'zuglet/initialize';
import Store from '../store';

export default {
  name: 'petite:store',
  initialize(app) {
    initialize(app, {
      store: {
        identifier: 'store',
        factory: Store
      },
      development: {
        logging: false
      }
    });
  }
};
