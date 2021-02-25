// https://github.com/pzuraq/macro-decorators/blob/master/src/index.ts
export const getPath = (obj, path) => {
  let segments = path.split('.');
  let current = obj;

  for(let segment of segments) {
    if(current === undefined || current === null) {
      break;
    }
    current = typeof current.get === 'function' ? current.get(segment) : current[segment];
  }
  return current;
}
