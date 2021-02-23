import Model from './-model';
import { inject as service } from "@ember/service";
import { activate, models } from 'zuglet/decorators';
import { load } from 'zuglet/utils';

export default class Projects extends Model {

  @service store;

  uid = null;

  @activate()
    .content(({ store, uid }) => store.refs.projects.collection.where('owner', '==', uid).query())
  query;

  @models()
    .source(({ query }) => query.content)
    .named('project')
    .mapping((doc) => ({ doc }))
  models;

  constructor(owner, { uid }) {
    super(owner);
    this.uid = uid;
  }

  async load() {
    await load(this.query);
  }

  byId(id) {
    return this.models.find(model => model.id === id);
  }

  async loadById(id) {
    await this.load();
    return this.byId(id);
  }

}
