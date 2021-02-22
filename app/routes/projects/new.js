import Route from '@ember/routing/route';
import { route } from 'zuglet/decorators';
import { inject as service } from '@ember/service';

@route()
export default class ProjectsNewRoute extends Route {

  @service store;

  model() {
    return this.store.models.create('route/projects/new');
  }

}
