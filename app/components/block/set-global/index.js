import Component from '@glimmer/component';
import { action } from "@ember/object";
import { setGlobal } from 'petit/util/set-global';

export default class BlockSetGlobalIndexComponent extends Component {

  @action
  setGlobal() {
    let { key, value, hash } = this.args;
    if(!hash) {
      hash = { [key]: value };
    }
    setGlobal(hash);
  }

}
