import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { reads } from 'macro-decorators';
import { lastObjects, lastObject } from 'petit/util/array';
import { action } from "@ember/object";

export default class ApplicationHeaderComponent extends Component {

  @service store;
  @service breadcrumbs;

  @reads('store.user') user;

  get item() {
    return lastObject(this.breadcrumbs.items);
  }

  get back() {
    let back = lastObjects(this.breadcrumbs.items, 2)[0];
    if(back === this.item) {
      return null;
    }
    return back;
  }

  @action
  didInsertToolsElement(e) {
    this.breadcrumbs._tools = e;
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.breadcrumbs._tools = null;
  }

}
