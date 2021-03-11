import Component from '@glimmer/component';

export default class BlockProjectInspectorContentFramesComponent extends Component {

  get frames() {
    let { args: { model, key } } = this;
    return model[key];
  }

}
