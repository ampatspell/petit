import Component from '@glimmer/component';
import { action } from "@ember/object"
import { reads } from 'macro-decorators';
import { next } from '../../../util/runloop';

export default class BlockDialogsAlertComponent extends Component {

  @reads('args.dialog')
  dialog;

  @action
  didInsertAlert(el) {
    el.focus();
  }

  @action
  async invoke(action) {
    let { status, fn } = action;
    let { dialog } = this;
    try {
      await this.invokeFunction(fn);
    } finally {
      dialog.resolve({ status });
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

  @action
  bindKeys(keys) {
    let bind = key => keys.add(key, () => {
      let action = this.dialog.actions.find(action => action.key === key);
      action && this.invoke(action);
    });
    bind('esc');
    bind('enter');
  }

}
