import Group from 'ember-cli-konva/components/konva/node/group';
import { reads } from "macro-decorators";

export default class EntityComponent extends Group {

  @reads('args.node') entity;
  @reads('entity.scene') scene;
  @reads('scene.pixel.absolute') pixel;
  @reads('args.size') size;

}
