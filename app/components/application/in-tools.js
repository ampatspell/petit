import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { reads } from "macro-decorators";

export default class ApplicationInToolsComponent extends Component {

  @service breadcrumbs;

  @reads('breadcrumbs._tools') element;

}
