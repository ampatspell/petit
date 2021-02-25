import Stage from 'ember-cli-konva/components/konva/stage';

export default class BlockKonvaEditorSpriteFramesStageComponent extends Stage {

  didCreateNode() {
    this.on('click', e => {
      if(e.target !== this.node) {
        return;
      }
      this.args.onClick();
    });
  }

}
