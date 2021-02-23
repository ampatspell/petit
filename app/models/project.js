import Model from './-model';
import { activate } from 'zuglet/decorators';
import { reads } from 'macro-decorators';
import { load } from 'zuglet/utils';

export default class Project extends Model {

  @activate() doc;

  @reads('doc.id') id;
  @reads('doc.data.title') title;
  @reads('doc.data.createdAt') createdAt;

  constructor(owner, { doc }) {
    super(owner);
    this.doc = doc;
  }

  async load() {
    let { doc } = this;
    await load(doc);
  }

  async delete() {
    await this.doc.delete();
  }

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
