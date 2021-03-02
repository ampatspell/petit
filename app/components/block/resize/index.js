import Component from '@glimmer/component';
import { events } from 'petit/util/window-events';
import { htmlSafe } from '@ember/template';
import { tracked } from "@glimmer/tracking";

export default class BlockResizeIndexComponent extends Component {

  constructor() {
    super(...arguments);
    this.windowEvents.start();
  }

  @tracked frame;

  get style() {
    let { frame } = this;
    if(!frame) {
      return null;
    }
    let { x, y, width, height } = frame;
    return htmlSafe(`transform: translate(${x}px, ${y}px); width: ${width}px; height: ${height}px`);
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

    let getPointerPosition = e => {
      let { pageX: x, pageY: y } = e;
      return { x, y };
    }

    let dragging = null;

    let mousedown = e => {
      let handle = getHandleElement(e);
      let node = this.args.node;
      if(handle && node) {
        e.stopPropagation();
        let pointer = getPointerPosition(e);
        let position = handle.dataset.position;

        let {
          editor: { x, y },
          width,
          height,
          pixel: { absolute: pixel }
        } = node;

        dragging = {
          position,
          pointer,
          node: {
            x,
            y,
            width,
            height,
            pixel
          }
        };
      }
    }

    let mousemove = e => {
      if(!dragging) {
        return;
      }
      e.stopPropagation();

      let pointer = getPointerPosition(e);

      let { node, position } = dragging;

      let _diff = prop => pointer[prop] - dragging.pointer[prop];
      let diff = {
        x: _diff('x'),
        y: _diff('y')
      };

      let x = 0;
      let y = 0;
      let width = (node.width * node.pixel);
      let height = (node.height * node.pixel);

      let round = v => Math.round(v / node.pixel) * node.pixel;

      if(position === 'top') {
        diff.y = Math.min(diff.y, height - node.pixel);
        height = round(height - diff.y);
        y = round(diff.y);
      } else if(position === 'bottom') {
        height = Math.max(round(height + diff.y), node.pixel);
      } else if(position === 'left') {
        diff.x = Math.min(diff.x, width - node.pixel);
        width = round(width - diff.x);
        x = round(diff.x);
      } else if(position === 'right') {
        width = Math.max(round(width + diff.x), node.pixel);
      }

      // eslint-disable-next-line ember/no-side-effects
      this.frame = {
        x,
        y,
        width,
        height
      };
    }

    let mouseup = e => {
      if(!dragging) {
        return;
      }
      e.stopPropagation();
      let { frame } = this;
      if(frame) {
        let { node, position: handle } = dragging;
        let scale = value => Math.round(value / node.pixel);
        let next = {
          handle,
          x: node.x + frame.x,
          y: node.y + frame.y,
          width: scale(frame.width),
          height: scale(frame.height)
        };
        if(frame.width !== next.width || frame.height !== next.height) {
          this.args.onCommit(next);
        }
      }
      dragging = null;
      // eslint-disable-next-line ember/no-side-effects
      this.frame = null;
    }

    return {
      mousedown,
      mousemove,
      mouseup
    };
  }

}
