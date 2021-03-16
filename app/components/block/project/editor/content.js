import Component from '@glimmer/component';
import { events } from 'petit/util/window-events';
import { action } from "@ember/object";
import { reads, equal } from "macro-decorators";

export default class BlockProjectEditorContentComponent extends Component {

  @reads('args.project') project;
  @equal('project.nodes.selected.group.tools.selected.type', 'project:drag') dragging;

  @action
  didInsertContent(el) {
    this.contentElement = el;
    this.windowEventHandlers.start();
  }

  @action
  onCenter(node, _component, el) {
    let rect = this.contentElement.getBoundingClientRect();
    let box = el.getBoundingClientRect();
    let calc = (p, s) => Math.round((rect[s] / 2) - node.editor[p] - (box[s] / 2));
    let pos = {
      x: calc('x', 'width'),
      y: calc('y', 'height')
    };
    this.project.update(pos);
  }

  @action
  onDeselect(e) {
    if(this.dragging) {
      return;
    }
    if(e.target !== this.contentElement) {
      return;
    }
    this.args.project.nodes.select(null);
  }

  @events
  get windowEventHandlers() {

    let getPointerPosition = e => {
      let rect = this.contentElement.getBoundingClientRect();
      let c = (rp, ep) => Math.round(e[ep] - rect[rp]);
      return {
        x: c('x', 'pageX'),
        y: c('y', 'pageY'),
      }
    }

    let dragging = null;

    let mousedown = e => {
      if(!this.dragging) {
        return;
      }
      let pointer = getPointerPosition(e);
      let { x, y } = this.project;
      let position = { x, y };
      dragging = {
        position,
        pointer
      };
    }

    let mousemove = e => {
      if(!dragging) {
        return;
      }
      let pointer = getPointerPosition(e);
      if(dragging) {
        let u = p => Math.round(dragging.position[p] + pointer[p] - dragging.pointer[p]);
        this.project.update({
          x: u('x'),
          y: u('y')
        });
      }
    }

    let mouseup = () => {
      dragging = null;
    };

    return {
      mousedown,
      mousemove,
      mouseup
    };
  }

}
