import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { reads } from 'macro-decorators';

export default class ApplicationHeaderComponent extends Component {

  @service store;

  @reads('store.user') user;

}
