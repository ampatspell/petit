import Component from '@glimmer/component';
import { action } from "@ember/object"
import { reads } from 'macro-decorators';
import { next } from '../../../util/runloop';

export default class BlockDialogsAlertComponent extends Component {

  @reads('args.dialog')
  dialog;

  @action
  async invoke(action) {
    let { status, fn } = action;
    try {
      await this.invokeFunction(fn);
    } finally {
      this.dialog.resolve({ status });
    }
  }

  async invokeFunction(fn) {
    if(!fn) {
      return;
    }

    this.isBusy = true;

    await next();
    await fn();
  }

}
