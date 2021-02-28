import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectInspectorContentPixelComponent extends Component {

  sizes = [ 1, 2, 4, 8 ];

  @reads('args.model.pixel') pixel;
  @reads('pixel.value') size;

  @action
  onSize(size) {
    this.pixel.update(size);
  }

}
