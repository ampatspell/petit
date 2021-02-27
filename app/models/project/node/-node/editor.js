import { reads } from "macro-decorators";

const {
  assign
} = Object;

class EditorProperties {

  @reads('node.doc.data.editor') data;

  @reads('data.x') x;
  @reads('data.y') y;

  constructor(node) {
    this.node = node;
  }

  update(props) {
    assign(this.data, props);
    this.node._scheduleSave.schedule();
  }

}

export const editor = node => {
  node.editor = new EditorProperties(node);
}
