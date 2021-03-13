import Component from '@glimmer/component';

export default class BlockProjectInspectorContentFramesComponent extends Component {

  pixel = 2;

  get frames() {
    let { args: { model, frames } } = this;
    return model[frames];
  }

  get size() {
    let { args: { model: { width, height } }, pixel } = this;
    return {
      width: width * pixel,
      height: height * pixel
    };
  }

}
