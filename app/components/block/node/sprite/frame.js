import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

const blank = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export default class BlockNodeSpriteFrameComponent extends Component {

  get pixel() {
    return this.args.pixel || 1;
  }

  get style() {
    let { args: { frame, maxHeight: max }, pixel } = this;
    if(!frame) {
      return null;
    }
    let { width, height } = frame;
    width = width * pixel;
    height = height * pixel;
    if(max) {
      if(height > max) {
        width = Math.round(width * (max / height));
        height = max;
      }
    }
    return htmlSafe(`width: ${width}px; height: ${height}px`);
  }

  get url() {
    let url = this.args.frame?.rendered.url;
    if(!url) {
      url = blank;
    }
    return url;
  }

}
