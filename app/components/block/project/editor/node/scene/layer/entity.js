import Group from 'ember-cli-konva/components/konva/node/group';
import { reads, equal } from "macro-decorators";
import { cached } from "tracked-toolbox";

export default class BlockProjectEditorNodeSceneLayerEntityComponent extends Group {

  @reads('args.node') entity;
  @reads('entity.scene') scene;
  @reads('scene.pixel.absolute') pixel;

  @equal('scene.tools.selected.type', 'edit') editing;

  @cached
  get size() {
    let { entity: { width, height }, pixel } = this;
    if(!width || !height) {
      return null;
    }

    let s = value => value * pixel;
    return {
      width: s(width),
      height: s(height)
    };
  }

  get nodeProperties() {
    let { entity: { x, y }, pixel } = this;
    let s = value => value * pixel;
    return {
      x: s(x),
      y: s(y)
    };
  }

  didCreateNode() {

    let dragging = null;

    let getPointerPosition = ({ evt: e }) => {
      let { pageX: x, pageY: y } = e;
      return { x, y };
    }

    this.on('mousedown', e => {
      let { entity, entity: { nodes } } = this;
      nodes.select(entity);

      if(!this.editing) {
        return;
      }

      let pointer = getPointerPosition(e);
      let { x, y } = entity.editor;

      dragging = {
        pointer,
        position: { x, y }
      };
    });

    this.on('mousemove', e => {
      if(!dragging) {
        return;
      }

      let pointer = getPointerPosition(e);
      let { entity, scene: { pixel: { absolute: pixel } } } = this;

      let round = v => Math.ceil(v / pixel) * pixel;

      let _diff = prop => round(pointer[prop] - dragging.pointer[prop]);
      let diff = {
        x: _diff('x'),
        y: _diff('y')
      };

      let _c = prop => Math.ceil((dragging.position[prop] + diff[prop]) / pixel);
      entity.update({
        x: _c('x'),
        y: _c('y'),
      });
    });

    this.on('mouseup', () => {
      if(!dragging) {
        return;
      }
      dragging = null;
    });
  }

}
