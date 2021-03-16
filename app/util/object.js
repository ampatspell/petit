export const compact = hash => {
  let result = {};
  for(let key in hash) {
    let value = hash[key];
    if(value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

export const pick = (hash, keys) => {
  let result = {};
  for(let key of keys) {
    let value = hash[key];
    if(value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}
