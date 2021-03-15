import EmberRouter from '@ember/routing/router';
import config from 'petit/config/environment';
import { didLoad } from './util/did-load';

export default class Router extends EmberRouter {

  location = config.locationType;
  rootURL = config.rootURL;

  constructor() {
    super(...arguments);
    this.on('routeWillChange', () => didLoad());
  }

}

Router.map(function () {

  this.route('session', function() {
    this.route('new');
    this.route('delete');
  });

  this.route('projects', function() {
    this.route('new');
    this.route('project', { path: ':project_id' }, function() {
    });
  });

  this.route('dev');

});
