import { later, cancel } from '@ember/runloop';
import { getInstance } from './instances';
import { getOwner } from '@ember/application';
import Model from '../models/-model';

class ScheduleSave extends Model {

  constructor(owner, model) {
    super(owner);
    this.model = model;
  }

  async save() {
    await this.model.save({ type: 'scheduled' });
  }

  cancel() {
    cancel(this._cancel);
    this._cancel = null;
  }

  schedule() {
    this.cancel();
    this._cancel = later(() => this.save(), 300);
  }

}

export const scheduleSave = (_, key) => {
  return {
    get() {
      return getInstance(this, key, () => new ScheduleSave(getOwner(this), this));
    }
  }
}
