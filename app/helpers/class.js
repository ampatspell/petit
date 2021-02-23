import { helper } from '@ember/component/helper';

export default helper(function(params, hash) {
  let strings = params.filter(Boolean);
  let defaults = hash.defaults || {};
  for(let key in hash) {
    if(key === 'defaults') {
      continue;
    }
    let value = hash[key] || defaults[key];
    if(value) {
      if(value === true) {
        strings.push(key);
      } else {
        strings.push(`${key}-${value}`);
      }
    }
  }
  return strings.join(' ');
});
