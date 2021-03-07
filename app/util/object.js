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
