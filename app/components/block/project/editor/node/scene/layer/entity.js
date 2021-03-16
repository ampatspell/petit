import Group from 'ember-cli-konva/components/konva/node/group';
import { reads, equal } from "macro-decorators";
import { cached } from "tracked-toolbox";

export default class BlockProjectEditorNodeSceneLayerEntityComponent extends Group {

  @reads('args.node') entity;
  @reads('entity.scene') scene;
  @reads('scene.pixel.absolute') pixel;
  @reads('scene.borders') borders;

  // TODO: locked
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
    let { entity: { x, y }, pixel, editing } = this;
    let s = value => value * pixel;
    return {
      x: s(x),
      y: s(y),
      draggable: editing
    };
  }

  didCreateNode() {
    let dragging = false;

    this.on('mousedown', () => {
      let { entity, entity: { nodes } } = this;
      nodes.select(entity);
    });

    this.on('dragstart', () => {
      dragging = true;
    });

    this.on('dragmove', () => {
      if(!dragging) {
        return;
      }

      let position = this.node.position();
      let pixel = this.scene.pixel.absolute;

      let _n = prop => Math.floor(position[prop] / pixel);
      let normalized = {
        x: _n('x'),
        y: _n('y')
      };

      let clamped = this.entity.clamp(normalized);

      let _s = prop => clamped[prop] * pixel;
      let scaled = {
        x: _s('x'),
        y: _s('y'),
      }

      this.node.position(scaled);
      this.entity.update(clamped);
    });

    this.on('dragend', () => {
      if(!dragging) {
        return;
      }
      dragging = false;
    });
  }

}
