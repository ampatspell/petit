import { later, cancel } from '@ember/runloop';

export default class ScheduleSave {

  constructor(owner) {
    this.owner = owner;
  }

  save() {
    this.owner.save({ type: 'scheduled' });
  }

  cancel() {
    cancel(this._cancel);
  }

  schedule() {
    this.cancel();
    this._cancel = later(() => this.save(), 1000);
  }

}
