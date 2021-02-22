import Model from './-model';
import { inject as service } from "@ember/service";
import { activate, models } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { cached } from 'tracked-toolbox';

export default class Projects extends Model {

  @service store;

  uid = null;

  @cached
  get collection() {
    return this.store.collection('projects');
  }

  @activate()
    .content(({ collection, uid }) => collection.where('owner', '==', uid).query())
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

  async create({ title }) {
    let { store, collection, uid: owner } = this;
    let doc = collection.doc().new({
      title,
      owner,
      createdAt: store.serverTimestamp,
      version: 1
    });
    await doc.save();
    return doc;
  }

}
