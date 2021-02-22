import { helper } from '@ember/component/helper';


export default helper(function dt([ date ]) {

  if(!date) {
    return;
  }

  if(date.toDate) {
    date = date.toDate();
  }

  return date.toLocaleString();
});
