import Store from 'zuglet/store';
import { reads } from 'macro-decorators';
import { cached } from 'tracked-toolbox';

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

export default class PetitStore extends Store {

  options = options;

  @reads('auth.user') user;

  @cached
  get refs() {
    return {
      projects: {
        collection: this.collection('projects'),
        doc: projectId => this.refs.projects.collection.doc(projectId),
      },
      nodes: {
        collection: projectId => this.refs.projects.doc(projectId).collection('nodes')
      }
    };
  }

  @cached
  get build() {
    return {
      projects: uid => this.models.create('projects', { uid }),
      project: id => {
        let doc = this.refs.projects.doc(id).existing();
        return this.models.create('project', { doc });
      }
    };
  }

}
