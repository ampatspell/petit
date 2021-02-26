import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { events } from '../../util/window-events';

class Rect {

  @tracked x;
  @tracked y;
  @tracked width;
  @tracked height;
  @tracked over;

  constructor(parent, x, y, width, height) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get selected() {
    return this.parent.selected === this;
  }

  get fill() {
    return this.selected ? "#333" : "#999";
  }

  isPointInside({ x, y }) {
    return this.x < x && this.x + this.width >= x && this.y < y && this.y + this.height >= y;
  }

}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class RouteDevComponent extends Component {

  models = [
    new Rect(this, 10, 10, 50, 50, "#333"),
    new Rect(this, 110, 10, 50, 50, "#444"),
    new Rect(this, 110, 110, 50, 50, "#555")
  ]

  @tracked selected;

  constructor() {
    super(...arguments);
  }

  //

  @action
  didInsertContent(e) {
    this.contentElement = e;
    this.handlers.start();
  }

  @events
  get handlers() {

    let getPointerPosition = e => {
      let rect = this.contentElement.getBoundingClientRect();
      let c = (rp, ep) => Math.round(e[ep] - rect[rp]);
      return {
        x: c('x', 'pageX'),
        y: c('y', 'pageY'),
      }
    }

    let pointedModel = pointer => this.models.find(model => model.isPointInside(pointer));

    let dragging;

    let mousemove = e => {
      let pointer = getPointerPosition(e);
      if(dragging) {
        // {
        //   let u = p => Math.round(pointer[p] - dragging.delta[p]);
        //   dragging.model.x = u('x');
        //   dragging.model.y = u('y');
        // }
        {
          let u = (p, m) => pointer[p] - dragging.pointer[p] + dragging[m];
          dragging.model.width = u('x', 'width');
          dragging.model.height = u('y', 'height');
        }
      }
    }

    let mousedown = e => {
      let pointer = getPointerPosition(e);
      let model = pointedModel(pointer);

      // eslint-disable-next-line ember/no-side-effects
      this.selected = model;

      if(!model) {
        return;
      }

      let d = p => pointer[p] - model[p];
      let delta = {
        x: d('x'),
        y: d('y')
      };
      dragging = {
        pointer,
        delta,
        model,
        width: model.width,
        height: model.height
      };
    }

    let mouseup = () => {
      dragging = null;
    }

    return {
      mousemove,
      mousedown,
      mouseup
    };
  }

}
