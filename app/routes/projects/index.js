import Route from '@ember/routing/route';
import { route } from 'zuglet/decorators';
import { inject as service } from '@ember/service';

@route()
export default class ProjectsIndexRoute extends Route {

  @service store;

  model() {
    return this.store.build.projects(this.store.user.uid);
  }

  load(model) {
    return model.load();
  }

}
