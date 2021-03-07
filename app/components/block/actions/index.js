import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class BlockActionsIndexComponent extends Component {

  registrations = null;

  constructor() {
    super(...arguments);
    this.register();
  }

  register() {
    let { args: { model, handlers } } = this;
    if(!model || !handlers) {
      return;
    }
    let registrations = [];
    for(let key in handlers) {
      registrations.push(model.actions.register(key, handlers[key]));
    }
    this.registrations = registrations;
  }

  unregister() {
    this.registrations?.forEach(cancel => cancel());
    this.registrations = null;
  }

  @action
  didUpdateModel() {
    this.unregister();
    this.register();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.unregister();
  }

}
