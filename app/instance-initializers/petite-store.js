import { initialize } from 'zuglet/initialize';
import Store from '../store';

export default {
  name: 'petit:store',
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
