import Component from '@glimmer/component';
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class BlockProjectInspectorFooterComponent extends Component {

  min = 1;
  max = 20;

  @reads('args.project') project;
  @reads('project.pixel') pixel;

  @action
  onPixel(pixel) {
    if(pixel > this.max || pixel < this.min) {
      return;
    }
    this.project.update({ pixel });
  }

}
