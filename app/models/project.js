import Model from './-model';
import { activate } from 'zuglet/decorators';
import { reads } from 'macro-decorators';

export default class Project extends Model {

  projects = null;

  @activate() doc;

  @reads('doc.id') id;
  @reads('doc.data.title') title;
  @reads('doc.data.createdAt') createdAt;

  constructor(owner, { doc }) {
    super(owner);
    this.doc = doc;
  }

  async load() {
  }

  async delete() {
    await this.doc.delete();
  }

  toStringExtension() {
    let { id, title } = this;
    return `${id}:${title}`;
  }

}
