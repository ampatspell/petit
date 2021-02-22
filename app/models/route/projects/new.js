import Model from '../../-model';
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { active } from '../../../util/model';

export default class NewProject extends Model {

  @service store;
  @service router;

  @tracked isBusy = false;
  @tracked title = '';

  get isValid() {
    return this.title.trim().length > 0;
  }

  get isSaveDisabled() {
    return !this.isValid || this.isBusy;
  }

  @active
  didSave({ id }) {
    this.router.transitionTo('projects.project', id);
  }

  @active
  saveDidFail(err) {
    this.isBusy = false;
    console.error(err.stack);
  }

  update(props) {
    Object.assign(this, props);
  }

  async save() {
    let { title, isBusy } = this;
    if(isBusy) {
      return;
    }
    this.isBusy = true;
    try {
      let doc = await this.store.user.projects.create({ title });
      this.didSave(doc);
    } catch(err) {
      this.saveDidFail(err);
    }
  }

}
