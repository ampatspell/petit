import { helper } from '@ember/component/helper';

export default helper(function stringify([ arg ]) {
  try {
    return JSON.stringify(arg, null, 2);
  } catch(err) {
    console.error(err.stack);
    return '';
  }
});
