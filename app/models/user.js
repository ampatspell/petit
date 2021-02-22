import BaseUser from 'zuglet/user';
import { model } from 'zuglet/decorators';

export default class User extends BaseUser {

  @model().named('projects').mapping(({ uid }) => ({ uid }))
  projects;

  async restore(user) {
    await super.restore(user);
  }

}
