export const removeAt = (array, index) => {
  if(index > -1) {
    array.splice(index, 1);
  }
  return array;
}

export const removeObject = (array, object) => {
  if(!array) {
    return;
  }
  let index = array.indexOf(object);
  return removeAt(array, index);
}

export const removeObjects = (array, objects) => {
  return objects.map(object => removeObject(array, object));
}

export const addObject = (array, object) => {
  if(!array.includes(object)) {
    array.push(object);
  }
  return array;
}

export const firstObject = array => {
  return array && array[0];
}

export const lastObject = array => {
  return array && array[array.length - 1];
}

export const lastObjects = (array, count) => {
  return array && array.slice(-count);
}

export const nextObject = (array, object) => {
  let idx = array.indexOf(object);
  if(idx === -1 || idx === array.length - 1) {
    return;
  }
  return array[idx + 1];
}

export const prevObject = (array, object) => {
  let idx = array.indexOf(object);
  if(idx === -1 || idx === 0) {
    return;
  }
  return array[idx - 1];
}

export const replaceObject = (array, previous, object) => {
  let index = array.indexOf(previous);
  if(index > -1) {
    array.splice(index, 1, object);
  }
  return array;
}

export const sortedBy = (array, arg) => {
  let fn = model => model[arg];
  if(typeof arg === 'function') {
    fn = arg;
  }
  return [ ...array ].sort((a, b) => {
    a = fn(a);
    b = fn(b);
    return a < b ? -1 : a > b ? 1 : 0;
  });
}

export const uniq = array => {
  let arr = [];
  array.forEach(item => addObject(arr, item));
  return arr;
}
