import Component from '@glimmer/component';

export default class BlockNodeSpriteFramesComponent extends Component {

  get size() {
    let { args: { size: { width, height }, pixel } } = this;
    return {
      width: width * pixel,
      height: height * pixel
    };
  }

}
