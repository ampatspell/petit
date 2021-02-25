import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class BlockNodePaletteColorRectComponent extends Component {

  get style() {
    let { args: { color } } = this;
    if(!color) {
      return null;
    }
    return htmlSafe(`background: ${color.rgba}`);
  }

}
