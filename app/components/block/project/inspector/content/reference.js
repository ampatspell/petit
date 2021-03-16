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

  get collection() {
    let { args: { collection, models } } = this;
    if(models) {
      return models;
    }
    if(collection) {
      return this.identified[collection];
    }
    return [];
  }

  get values() {
    let { collection, value } = this;
    if(value?.missing) {
      return [ null, value, ...collection ];
    }
    return [ null, ...collection ];
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

  @action
  onFollow() {
    let model = this.reference?.model;
    if(model) {
      model.nodes.select(model);
    }
  }

}
