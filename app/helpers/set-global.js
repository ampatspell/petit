import { helper } from '@ember/component/helper';
import { setGlobal } from '../util/set-global';

export default helper(function(_, hash) {
  setGlobal(hash);
  return '';
});
