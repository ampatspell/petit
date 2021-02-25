import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectInspectorContentReferenceComponent extends Component {

  @reads('args.model.nodes.identified') identified;

  get values() {
    let { args: { collection } } = this;
    return [ null, ...this.identified[collection] ];
  }

  get reference() {
    let { args: { model, key } } = this;
    return model[key];
  }

  @reads('reference.model') value;

  @action
  onChange(value) {
    let { args: { model, key } } = this;
    model.update({ [key]: value });
  }

}
