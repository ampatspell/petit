import Model, { doc, data } from './-model';
import { activate } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { model } from 'zuglet/decorators';

export default class Project extends Model {

  @activate() doc;

  @doc('id') id;
  @data('title') title;
  @data('createdAt') createdAt;

  @model()
    .named('project/nodes')
    .mapping(({ id: projectId }) => ({ projectId }))
  nodes

  constructor(owner, { doc }) {
    super(owner);
    this.doc = doc;
  }

  async load() {
    let { doc } = this;
    await load(doc);
    await this.nodes.load();
  }

  async delete() {
    await this.doc.delete();
  }

  toStringExtension() {
    let { id } = this;
    return `${id}`;
  }

}
