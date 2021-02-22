import EmberRouter from '@ember/routing/router';
import config from 'petite/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {

  this.route('session', function() {
    this.route('new');
    this.route('delete');
  });

  this.route('projects', function() {
    this.route('project', { path: ':project_id' }, function() {
    });
  });

  this.route('dev');

});
