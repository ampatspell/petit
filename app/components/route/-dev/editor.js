import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class RouteDevEditorComponent extends Component {

  get style() {
    let { x, y } = this.args.model;
    return htmlSafe(`transform: translate(${x}px, ${y}px)`);
  }

}
