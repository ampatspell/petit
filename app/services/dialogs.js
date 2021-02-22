import Service, { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { addObject, removeObject } from '../util/array';
import { assert } from '@ember/debug';

const {
  assign
} = Object;

export default class DialogsService extends Service {

  @service store;

  @tracked presenters = [];
  @tracked models = [];

  registerPresenter(component) {
    this.presenters = addObject(this.presenters, component);
  }

  unregisterPresenter(component) {
    this._cancelAll(component);
    this.presenters = removeObject(this.presenters, component);
  }

  presenter(label, required=true) {
    let presenter = this.presenters.findBy('label', label);
    assert(`presenter '${label}' not registered`, !!presenter || !required);
    return presenter;
  }

  _cancelAll(presenter) {
    let models = this.models.filterBy('presenter', presenter);
    models.forEach(model => model.cancel());
  }

  _remove(model) {
    this.models.removeObject(model);
  }

  model(dialog, presenter, opts) {
    let dialogs = this;
    return this.store.models.create('dialog', assign({ dialogs, dialog, presenter }, opts));
  }

  present(label, name, opts) {
    let presenter = this.presenter(label || 'application');
    let model = this.model(name, presenter, opts);
    this.models.pushObject(model);
    return model.promise;
  }

  //

  //
  // let confirmed = await this.dialogs.alert('Are you sure you want to delete this project?', 'Cancel', 'Delete');
  // console.log(confirmed);
  //
  async alert(message, cancel, confirm, fn) {
    let result = await this.present('application', 'alert', {
      message,
      actions: [
        { label: cancel,  status: 'cancelled' },
        { label: confirm, status: 'confirmed', color: 'warning', fn: () => fn && fn() }
      ]
    });

    let { status } = result;

    if(status === 'confirmed') {
      return true;
    }

    return false;
  }

}
