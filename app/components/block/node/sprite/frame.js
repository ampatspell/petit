import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class BlockNodeSpriteFrameComponent extends Component {

  get pixel() {
    return this.args.pixel || 1;
  }

  get style() {
    let { args: { frame: { width, height } }, pixel } = this;
    return htmlSafe(`width: ${width * pixel}px; height: ${height * pixel}px`);
  }

}
