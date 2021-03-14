import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { unwrapReference } from 'petit/util/reference';

const blank = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export default class BlockNodeSpriteFrameComponent extends Component {

  get pixel() {
    return this.args.pixel || 1;
  }

  // TODO: wrap ref component around
  get frame() {
    return unwrapReference(this.args.frame);
  }

  // TODO: relevant only for timeline. wrap
  get size() {
    return this.frame || this.args.size;
  }

  get style() {
    let { size, args: { maxHeight: max }, pixel } = this;
    if(!size) {
      return null;
    }
    let { width, height } = size;
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
    let url = this.frame?.rendered.url;
    if(!url) {
      url = blank;
    }
    return url;
  }

}
