import Route from '@ember/routing/route';
import { route } from 'zuglet/decorators';
import { inject as service } from '@ember/service';

@route()
export default class ProjectsProjectRoute extends Route {

  @service store;

  model({ project_id }) {
    return this.store.build.project(project_id);
  }

  async load(model) {
    await model.load();
  }

}
