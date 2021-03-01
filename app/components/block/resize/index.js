import Component from '@glimmer/component';
import { action } from "@ember/object";
import { events } from 'petit/util/window-events';

export default class BlockResizeIndexComponent extends Component {

  @action
  didInsertResizeElement(el) {
    this.el = el;
    this.windowEvents.start();
  }

  @events
  get windowEvents() {

    let getHandleElement = e => {
      let target = e.target;
      if(target.dataset.type !== 'resize-handle') {
        return;
      }
      return target;
    }

    let getSize = () => {
      let { width, height } = this.el.getBoundingClientRect();
      return { width, height };
    }

    let getPointerPosition = e => {
      let { pageX: x, pageY: y } = e;
      return { x, y };
    }

    let dragging = null;

    let mousedown = e => {
      let handle = getHandleElement(e);
      let resize = this.args.onResize();
      if(handle && resize) {
        e.stopPropagation();
        resize.start();
        let pointer = getPointerPosition(e);
        let position = handle.dataset.position;
        dragging = {
          position,
          pointer,
          resize
        };
      }
    }

    let mousemove = e => {
      if(!dragging) {
        return;
      }
      e.stopPropagation();
      let pointer = getPointerPosition(e);
      let c = prop => pointer[prop] - dragging.pointer[prop];
      let diff = {
        width: c('x'),
        height: c('y'),
      };
      let { position } = dragging;
      if(position === 'top' || position === 'bottom') {
        diff.width = 0;
        if(position === 'top') {
          diff.height = -diff.height;
        }
      } else if(position === 'left' || position === 'right') {
        diff.height = 0;
        if(position === 'left') {
          diff.width = -diff.width;
        }
      }
      dragging.resize.resize(dragging.position, diff);
    }

    let mouseup = e => {
      if(!dragging) {
        return;
      }
      dragging.resize.stop();
      dragging = null;
      e.stopPropagation();
    }

    return {
      mousedown,
      mousemove,
      mouseup
    };
  }

}
