export const removeObject = (array, object) => {
  let index = array.indexOf(object);
  if(index > -1) {
    array.splice(index, 1);
  }
  return array;
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
