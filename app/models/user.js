import User from 'zuglet/user';

export default class PetiteUser extends User {

  async restore(user) {
    await super.restore(user);
  }

}
