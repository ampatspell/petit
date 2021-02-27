import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { addObject, removeObject, replaceObject } from '../util/array';
import { scheduleOnce } from '@ember/runloop';
import { action } from "@ember/object";

export default class BreadcrumbsService extends Service {

  @tracked _tools;

  _items = [];
  @tracked items = [];

  find(token) {
    return this._items.find(hash => hash.token === token);
  }

  register(hash) {
    let existing = this.find(hash.token);
    if(existing) {
      this._items = replaceObject(this._items, existing, hash);
    } else {
      this._items = addObject(this._items, hash);
    }
    this.scheduleUpdate();
  }

  unregister(token) {
    let hash = this.find(token);
    this._items = removeObject(this._items, hash);
    this.scheduleUpdate();
  }

  @action
  update() {
    this.items = this._items;
  }

  scheduleUpdate() {
    scheduleOnce('afterRender', this.update);
  }

}
