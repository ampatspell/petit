import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

class Missing {

  missing = true;

  constructor(component) {
    this._component = component;
  }

  get identifier() {
    return `Missing "${this._component.reference.identifier}"`;
  }

}

export default class BlockProjectInspectorContentReferenceComponent extends Component {

  @reads('args.model.nodes.identified') identified;

  missing = new Missing(this);

  get values() {
    let { args: { collection }, value } = this;
    let models = this.identified[collection];
    if(value?.missing) {
      return [ null, value, ...models ];
    }
    return [ null, ...models ];
  }

  get reference() {
    let { args: { model, key } } = this;
    return model[key];
  }

  get value() {
    let { reference: { model, missing } }  = this;
    if(missing) {
      return this.missing;
    }
    return model;
  }

  @action
  onChange(value) {
    if(value?.missing) {
      return;
    }
    let { args: { model, key } } = this;
    model.update({ [key]: value });
  }

}
