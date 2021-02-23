import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { next, cancel } from '@ember/runloop';
import { firstObject } from '../../../util/array';
import { action } from "@ember/object";
import { reads } from 'macro-decorators';

export default class BlockDialogsComponent extends Component {

  @service dialogs;

  @reads('args.label') label;

  get model() {
    let model = firstObject(this.dialogs.models);
    if(model && model.presenter === this) {
      return model;
    }
    return undefined;
  }

  constructor() {
    super(...arguments);
    this._cancel = next(() => this.dialogs.registerPresenter(this));
  }

  willDestroy() {
    super.willDestroy(...arguments);
    cancel(this._cancel);
    this.dialogs.unregisterPresenter(this);
  }

  @action
  cancel() {
    this.model.cancel();
  }

}
