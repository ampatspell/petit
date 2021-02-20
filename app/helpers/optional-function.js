import { helper } from '@ember/component/helper';

const noop = () => {};

export default helper(function optionalFunction([ fn ]) {
  return fn || noop;
});
