import Store from 'zuglet/store';
import { reads } from 'macro-decorators';

const options = {
  firebase: {
    apiKey: "AIzaSyDwCGLTmvKCiCxIO9msehKyULJ_rilnEvw",
    authDomain: "quatsch-38adf.firebaseapp.com",
    databaseURL: "https://quatsch-38adf.firebaseio.com",
    projectId: "quatsch-38adf",
    storageBucket: "quatsch-38adf.appspot.com",
    appId: "1:316370319143:web:1ea76935876b7619"
  },
  firestore: {
    persistenceEnabled: true
  },
  auth: {
    user: 'user'
  },
  // functions: {
  //   region: null
  // }
};

export default class PetiteStore extends Store {

  options = options;

  @reads('auth.user') user;

}
