import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { route } from 'zuglet/decorators';
import { requirement } from '../-requirement';

@route()
@requirement('not-authenticated')
export default class SessionNewRoute extends Route {

  @service
  store

  model() {
    return this.store.models.create('route/session/new');
  }

}
