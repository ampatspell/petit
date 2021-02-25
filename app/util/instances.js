let INSTANCES = new WeakMap();

export const getInstance = (target, key, cb) => {
  let instances = INSTANCES.get(target);
  if(!instances) {
    instances = {};
    INSTANCES.set(target, instances);
  }
  let instance = instances[key];
  if(!instance) {
    instance = cb();
    instances[key] = instance;
  }
  return instance;
}
