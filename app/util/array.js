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

export const replaceObject = (array, previous, object) => {
  let index = array.indexOf(previous);
  if(index > -1) {
    array.splice(index, 1, object);
  }
  return array;
}
