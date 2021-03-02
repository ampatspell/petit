import Component from '@glimmer/component';
import { action } from "@ember/object";
import { events } from 'petit/util/window-events';
import { reads } from "macro-decorators";

export default class BlockProjectEditorIndexComponent extends Component {

  @reads('args.project') project;
  @reads('args.project.nodes.visible') visible;

  @action
  didInsertContent(el) {
    this.contentElement = el;
    this.windowEventHandlers.start();
  }

  @action
  onDeselect(e) {
    // TODO: needs to be tool
    if(this.project.nodes.editor.draggable) {
      return;
    }
    if(e.target !== this.contentElement) {
      return;
    }
    this.onSelect(null);
  }

  @action
  onSelect(node) {
    let { project: { nodes } } = this;
    nodes.select(node);
  }

  @events
  get windowEventHandlers() {

    let editorElement = e => {
      let el = e.target;
      while(el) {
        if(el.dataset.type === 'editor') {
          return el;
        }
        el = el.parentElement;
      }
    }

    let nodeForEditorElement = el => {
      let idx = parseInt(el.dataset.index);
      return this.visible[idx];
    }

    let isTargetDraggable = e => {
      return e.target.dataset.draggable !== 'false';
    }

    let isNodeDraggable = node => {
      let { tools } = node;
      if(!tools) {
        return true;
      }
      let type = tools.selected.type;
      return [ 'idle', 'resize' ].includes(type);
    }

    let getPointerPosition = e => {
      let rect = this.contentElement.getBoundingClientRect();
      let c = (rp, ep) => Math.round(e[ep] - rect[rp]);
      return {
        x: c('x', 'pageX'),
        y: c('y', 'pageY'),
      }
    }

    let dragging;

    let mousemove = e => {
      let pointer = getPointerPosition(e);
      if(dragging) {
        let u = p => Math.round(pointer[p] - dragging.delta[p]);
        dragging.node.editor.update({
          x: u('x'),
          y: u('y')
        });
      }
    }

    let mousedown = e => {
      if(!isTargetDraggable(e)) {
        return;
      }

      let pointer = getPointerPosition(e);
      let el = editorElement(e);
      if(!el) {
        return;
      }

      let node = nodeForEditorElement(el);
      if(!isNodeDraggable(node, e)) {
        return;
      }

      this.onSelect(node);

      let d = p => pointer[p] - node.editor[p];
      dragging = {
        node,
        delta: {
          x: d('x'),
          y: d('y')
        }
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
