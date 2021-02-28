import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

const blank = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export default class BlockNodeSpriteFrameComponent extends Component {

  get pixel() {
    return this.args.pixel || 1;
  }

  get style() {
    let { args: { frame: { width, height } }, pixel } = this;
    return htmlSafe(`width: ${width * pixel}px; height: ${height * pixel}px`);
  }

  get url() {
    let url = this.args.frame.rendered.url;
    if(!url) {
      url = blank;
    }
    return url;
  }

}
