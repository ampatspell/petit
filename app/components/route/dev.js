import Component from '@glimmer/component';
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class RouteDevComponent extends Component {

  @service store;

  id = 'Ppc7TEqx1oQ9YOqS9BXp';

  get coll() {
    return this.store.refs.projects.doc(this.id).collection('nodes');
  }

  @action
  async onClick() {
    await this.clear();
    await this.insert();
  }

  async clear() {
    let docs = await this.coll.load();
    await Promise.all(docs.map(doc => doc.delete()));
  }

  async insert() {
    let coll = this.coll;
    let scene = coll.doc().new({
      type: 'scene',
      identifier: 'Scene #1',
      parent: null
    });
    let layer = coll.doc().new({
      type: 'scene/layer',
      identifier: 'Characters',
      parent: scene.id
    });
    let entity = coll.doc().new({
      type: 'entity',
      identifier: 'Ducky Entity',
      parent: layer.id
    });
    let duck = coll.doc().new({
      type: 'sprite',
      identifier: 'Ducky',
      parent: null
    });
    await Promise.all([
      scene.save(),
      layer.save(),
      entity.save(),
      duck.save()
    ]);
  }


}
