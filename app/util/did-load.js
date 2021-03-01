let _didLoad = false;
export const didLoad = () => {
  if(_didLoad) {
    return;
  }
  _didLoad = true;
  let el = document.querySelector('.application-loading');
  el.remove();
}
