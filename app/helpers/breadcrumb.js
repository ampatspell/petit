import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import { inject as service } from "@ember/service";

const {
  assign
} = Object;

export default class Breadcrumb extends Helper {

  @service breadcrumbs;

  get token() {
    return guidFor(this);
  }

  compute(params, _hash) {
    let { token } = this;
    let hash = assign({}, _hash, { token });
    this.breadcrumbs.register(hash);
    return '';
  }

  willDestroy() {
    super.willDestroy();
    this.breadcrumbs.unregister(this.token);
  }

}
