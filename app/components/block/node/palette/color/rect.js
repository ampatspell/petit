import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class BlockNodePaletteColorRectComponent extends Component {

  get style() {
    let { args: { color, size } } = this;
    let props = [];
    if(color) {
      props.push(`background: ${color.rgba}`);
    }
    if(typeof size === 'number') {
      size = size * 5;
      props.push(`width: ${size}px; height: ${size}px`);
    }
    return htmlSafe(props.join('; '));
  }

}
